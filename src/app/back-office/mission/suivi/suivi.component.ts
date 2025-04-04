import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { MissionService } from '../../services/mission/mission.service';
import { ActivatedRoute } from '@angular/router';
import { IMission, IPrestation } from '@/types/output';
import { PrestationService } from '../../services/prestation/prestation.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-suivi',
  standalone: false,
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.css'],
})
export class SuiviComponent {
  mission = signal<IMission | null>(null);
  pending = signal<IMission['services']>([]);
  inProgress = signal<IMission['services']>([]);
  done = signal<IMission['services']>([]);
  archives = signal<IMission['services']>([]);

  confettiDone: boolean = false;

  @ViewChild('facture') facture!: ElementRef;

  selectedList = signal<'pending' | 'in_progress' | 'done' | null>(null);
  selectedService = signal<
    (Omit<IPrestation, 'type'> & { status: string }) | null
  >(null);

  prestations = signal<IPrestation[]>([]);
  selectedPrestation = signal<Omit<
    IPrestation & { status: string },
    'type'
  > | null>(null);
  type = signal<'pending' | 'in_progress' | 'done'>('pending');

  public state = signal<'closed' | 'open'>('closed');

  stateChanged(state: 'open' | 'closed') {
    this.state.set(state);
  }

  launchConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  constructor(
    private missionService: MissionService,
    private route: ActivatedRoute,
    private prestationService: PrestationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.initMission(params['id']);
    });
  }

  loadPrestations() {
    this.prestationService.getAllPrestations().then((prestations) => {
      const prestationToSet = prestations.filter(
        (p) => !this.mission()?.services?.some((s) => s._id === p._id)
      );

      this.prestations.set(prestationToSet);
    });
  }

  initMission(id: string) {
    this.missionService.getMission(id).then((mission) => {
      this.pending.set(
        mission.services?.filter((s) => s.status === 'pending') || []
      );
      this.inProgress.set(
        mission.services?.filter((s) => s.status === 'in_progress') || []
      );
      this.done.set(mission.services?.filter((s) => s.status === 'done') || []);
      this.archives.set(
        mission.services?.filter((s) => s.status === 'cancelled') || []
      );
      this.mission.set(mission);
      this.loadPrestations();
    });
  }

  drop(event: CdkDragDrop<IMission['services']>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.save();
    }
  }

  save() {
    const currentMission = this.mission();
    const pendingServices = this.pending();
    const inProgressServices = this.inProgress();
    const doneServices = this.done();
    const archiveServices = this.archives();

    if (!currentMission) return;

    const updatedMission: IMission = {
      ...currentMission,
      services: [
        ...pendingServices.map((s) => ({ ...s, status: 'pending' })),
        ...inProgressServices.map((s) => ({ ...s, status: 'in_progress' })),
        ...doneServices.map((s) => ({ ...s, status: 'done' })),
        ...archiveServices.map((s) => ({ ...s, status: 'cancelled' })),
      ],
    };

    this.missionService.update(updatedMission).then((mission) => {
      this.mission.set(mission);
    });
  }

  onPrestationSelect(prestation: IPrestation) {
    this.selectedPrestation.set({ ...prestation, status: this.type() });
  }

  addService(
    prestation: Omit<IPrestation & { status: string }, 'type'>,
    type: 'pending' | 'in_progress' | 'done'
  ) {
    switch (type) {
      case 'pending':
        this.pending.update((services) => [
          ...services,
          { ...prestation, status: type },
        ]);
        break;
      case 'in_progress':
        this.inProgress.update((services) => [
          ...services,
          { ...prestation, status: type },
        ]);
        break;
      case 'done':
        this.done.update((services) => [
          ...services,
          { ...prestation, status: type },
        ]);
        break;
    }
    this.save();
  }

  calculatePercent(total: number, value: number) {
    return (value / total) * 100;
  }

  calculateServicePercentage(status: 'pending' | 'in_progress' | 'done') {
    const mission = this.mission();
    if (!mission) return 0;
    const totalActiveServices = mission.services.filter(
      (s) => s.status !== 'cancelled'
    ).length;
    if (totalActiveServices === 0) return 0;

    let count = 0;
    switch (status) {
      case 'pending':
        count = this.pending().length;
        break;
      case 'in_progress':
        count = this.inProgress().length;
        break;
      case 'done':
        count = this.done().length;
        break;
    }
    const average = count / totalActiveServices;

    if (average === 1 && status === 'done' && !this.confettiDone) {
      this.launchConfetti();
      this.confettiDone = true;
    } else if (average !== 1 && status === 'done') {
      this.confettiDone = false;
    }
    return average;
  }

  calculateTotal(): number {
    return this.done().reduce((total, service) => total + service.price, 0);
  }

  archiveSelected() {
    const service = this.selectedService();
    const list = this.selectedList();
    if (!service || !list) return;
    switch (list) {
      case 'pending':
        this.pending.update((services) =>
          services.filter((s) => s._id !== service._id)
        );
        break;
      case 'in_progress':
        this.inProgress.update((services) =>
          services.filter((s) => s._id !== service._id)
        );
        break;
      case 'done':
        this.done.update((services) =>
          services.filter((s) => s._id !== service._id)
        );
        break;
    }
    this.archives.update((services) => [
      ...services,
      { ...service, status: 'cancelled' },
    ]);
    this.save();
  }

  async exportPdf() {
    try {
      const element = document.getElementById('facture');
      if (!element) {
        throw new Error('Facture element not found');
      }

      const canvas = await html2canvas(element, {
        scale: 1,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = 210;
      const pageHeight = 297;

      const margin = 0;
      const contentWidth = pageWidth - 2 * margin;

      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * contentWidth) / canvas.width;

      const x = margin;

      pdf.addImage(imgData, 'JPEG', x, 0, imgWidth, imgHeight);

      pdf.save(`facture-${this.mission()?._id}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  }

  restore(service: Omit<IPrestation & { status: string }, 'type'>) {
    this.pending.update((services) => [
      ...services,
      { ...service, status: 'pending' },
    ]);
    this.archives.update((services) =>
      services.filter((s) => s._id !== service._id)
    );
    this.save();
  }
}

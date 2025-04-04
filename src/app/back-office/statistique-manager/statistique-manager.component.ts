import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MissionService } from '@/app/back-office/services/mission/mission.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-statistique-manager',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CanvasJSAngularChartsModule,
    FormsModule,
  ],
  templateUrl: './statistique-manager.component.html',
  styleUrl: './statistique-manager.component.css',
})
export class StatistiqueManagerComponent implements OnInit {
  @ViewChild('chartContainer') chartContainer?: ElementRef;

  font_color: string = '#4a5261';
  labelFontColor: string = '#444444';

  currentLang: 'fr' | 'en' = 'en';
  chartOptions: any;
  chart: any;
  data = Array.from({ length: 12 }, (_, i) => ({ month: i, value: 0 }));
  currentYear: number = 2025;
  yearOptions: number[] = [];
  sizeTotal: number = 0;

  monthLabels: Record<'fr' | 'en', string[]> = {
    fr: [
      'Jan',
      'Fév',
      'Mar',
      'Avr',
      'Mai',
      'Juin',
      'Juil',
      'Août',
      'Sep',
      'Oct',
      'Nov',
      'Déc',
    ],
    en: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  };

  chartTitles: Record<'fr' | 'en', string> = {
    fr: 'Nombre de Ventes Mensuelles',
    en: 'Monthly Sales',
  };

  yAxisTitles: Record<'fr' | 'en', string> = {
    fr: 'Nombre de Ventes',
    en: 'Number of Sales',
  };

  constructor(
    private translateService: TranslateService,
    private missionService: MissionService
  ) {}

  ngOnInit(): void {
    const initialLang = this.translateService.currentLang;
    this.currentLang =
      initialLang === 'fr' || initialLang === 'en' ? initialLang : 'fr';
    this.fetchSalesData(this.currentYear);
    this.generateYearOptions();

    this.translateService.onLangChange.subscribe(() => {
      const newLang = this.translateService.currentLang;
      this.currentLang = newLang === 'fr' || newLang === 'en' ? newLang : 'fr';
      this.updateChart();
    });
  }

  generateYearOptions(): void {
    this.yearOptions = [];
    const currentYear = new Date().getFullYear();

    for (let i = 0; i <= 6; i++) {
      this.yearOptions.push(currentYear - i);
    }
  }

  fetchSalesData(year: number): void {
    this.data = Array.from({ length: 12 }, (_, i) => ({
      month: i,
      value: 0,
    }));

    this.sizeTotal = 0;

    this.currentYear = year;

    this.missionService
      .getStatistiqueByYear(year)
      .then((response) => {
        if (response && response.data) {
          response.data.forEach((item: any) => {
            const monthIndex = item._id.month - 1;
            if (monthIndex >= 0 && monthIndex < 12) {
              this.data[monthIndex].value = item.count;
              this.sizeTotal += item.count;
            }
          });
        }

        this.updateChart();
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des statistiques:', error);
        this.updateChart();
      });
  }

  updateChart(): void {
    const dataPoints = this.data.map((item) => {
      return {
        x: item.month,
        y: item.value,
        label: this.monthLabels[this.currentLang][item.month],
      };
    });

    this.chartOptions = {
      backgroundColor: 'transparent',
      title: {
        fontSize: 24,
        // fontWeight: 'bold',
        fontColor: this.font_color,
        text: this.chartTitles[this.currentLang],
      },
      animationEnabled: true,
      axisX: {
        interval: 1,
        intervalType: 'month',
        tickColor: 'red',
        labelFontColor: this.labelFontColor,
        fontColor: this.font_color,
        valueFormatString: '#',
        minimum: 0,
        labelFormatter: (e: any) => {
          return this.monthLabels[this.currentLang][e.value];
        },
      },
      axisY: {
        title: this.yAxisTitles[this.currentLang],
        // interlacedColor: '#EBF2FA',
        labelFontColor: this.labelFontColor,
        fontColor: this.font_color,
        // gridColor: 'red',
        tickColor: 'red',
      },
      data: [
        {
          name: 'ventes',
          type: 'area',
          markerSize: 8,
          dataPoints: dataPoints,
        },
      ],
    };

    setTimeout(() => {
      if (this.chart) {
        this.chart.options = this.chartOptions;
        this.chart.render();
      }
    });
  }

  changeLanguage(lang: 'fr' | 'en'): void {
    this.translateService.use(lang);
  }

  onYearChange(): void {
    this.fetchSalesData(this.currentYear);
  }

  getChartInstance(chart: any): void {
    this.chart = chart;
  }
}

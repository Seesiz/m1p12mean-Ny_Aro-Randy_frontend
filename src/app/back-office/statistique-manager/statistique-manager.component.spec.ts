import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueManagerComponent } from './statistique-manager.component';

describe('StatistiqueManagerComponent', () => {
  let component: StatistiqueManagerComponent;
  let fixture: ComponentFixture<StatistiqueManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatistiqueManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistiqueManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

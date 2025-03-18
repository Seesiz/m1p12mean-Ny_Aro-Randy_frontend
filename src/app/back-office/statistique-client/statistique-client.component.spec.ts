import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueClientComponent } from './statistique-client.component';

describe('StatistiqueClientComponent', () => {
  let component: StatistiqueClientComponent;
  let fixture: ComponentFixture<StatistiqueClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatistiqueClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistiqueClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

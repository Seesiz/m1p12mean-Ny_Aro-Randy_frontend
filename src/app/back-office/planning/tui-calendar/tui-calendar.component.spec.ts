import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuiCalendarComponent } from './tui-calendar.component';

describe('TuiCalendarComponent', () => {
  let component: TuiCalendarComponent;
  let fixture: ComponentFixture<TuiCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TuiCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuiCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

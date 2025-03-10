import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontOffcieComponent } from './front-offcie.component';

describe('FrontOffcieComponent', () => {
  let component: FrontOffcieComponent;
  let fixture: ComponentFixture<FrontOffcieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontOffcieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontOffcieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

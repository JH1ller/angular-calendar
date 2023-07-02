import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentOverviewComponent } from './appointment-overview.component';

describe('AppointmentOverviewComponent', () => {
  let component: AppointmentOverviewComponent;
  let fixture: ComponentFixture<AppointmentOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentOverviewComponent]
    });
    fixture = TestBed.createComponent(AppointmentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

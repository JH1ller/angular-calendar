import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthCalendarComponent } from './month-calendar.component';

describe('MonthCalendarComponent', () => {
  let component: MonthCalendarComponent;
  let fixture: ComponentFixture<MonthCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthCalendarComponent]
    });
    fixture = TestBed.createComponent(MonthCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

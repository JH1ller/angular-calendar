import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  eachHourOfInterval,
  format,
  isSameDay,
  isSameHour,
  setHours,
} from 'date-fns';
import { Appointment } from 'src/app/models/dtos/appointment.model';
import { AppointmentDialog } from './components/appointment-dialog.component';

@Component({
  selector: 'im-week-calendar',
  templateUrl: './week-calendar.component.html',
  styleUrls: ['./week-calendar.component.scss'],
})
export class WeekCalendarComponent {
  @Input() currentDate: Date;
  @Input() currentWeek: Date[];
  @Input() appointments: Appointment[];
  @Output() changeDate = new EventEmitter<Date>();
  @Output() prevWeek = new EventEmitter();
  @Output() nextWeek = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  public isSameDay(leftDate: Date, rightDate: Date) {
    return isSameDay(leftDate, rightDate);
  }

  public getHoursOfDay(day: Date) {
    return eachHourOfInterval({
      start: setHours(day, 8),
      end: setHours(day, 20),
    });
  }

  public getFormattedDayHeader(day: Date): string {
    return format(day, 'd iii').toUpperCase();
  }

  public getFormattedDateTitle(): string {
    return `${this.currentWeek[0].getDate()} - ${this.currentWeek[6].getDate()} ${format(
      this.currentDate,
      'MMMM yyyy'
    )}`;
  }

  public getFormattedHour(hour: Date): string {
    return format(hour, 'kk:mm');
  }

  public getNumberOfAppointmentsInHour = (hour: Date) => {
    return this.appointments.filter((appointment) =>
      isSameHour(new Date(appointment.date), hour)
    ).length;
  };

  public hourClicked(hour: Date): void {
    // don't opan dialog if hour has no appointments
    if (!this.getNumberOfAppointmentsInHour(hour)) return;

    this.changeDate.emit(hour);
    this.dialog.open(AppointmentDialog);
  }
}

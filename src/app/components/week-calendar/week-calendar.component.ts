import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  eachHourOfInterval,
  format,
  isSameDay,
  isSameHour,
  isSameWeek,
  setHours,
} from 'date-fns';
import { Appointment } from 'src/app/models/dtos/appointment.model';

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

  public getFormattedHour(hour: Date): string {
    return format(hour, 'kk:mm');
  }

  public getNumberOfAppointmentsInHour = (hour: Date) => {
    return this.appointments.filter((appointment) =>
      isSameHour(new Date(appointment.date), hour)
    ).length;
  };

  public pluralize(label: string, count: number): string {
    return `${count} ${label}${count !== 1 ? 's' : ''}`;
  }
}

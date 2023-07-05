import { Component, EventEmitter, Input, Output } from '@angular/core';
import { format, isSameDay, isSameWeek } from 'date-fns';
import { Appointment } from 'src/app/models/dtos/appointment.model';

@Component({
  selector: 'im-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss'],
})
export class MonthCalendarComponent {
  @Input() currentDate: Date;
  @Input() calendarWeeks: Date[][];
  @Input() appointments: Appointment[];
  @Output() changeDate = new EventEmitter<Date>();
  @Output() prevMonth = new EventEmitter();
  @Output() nextMonth = new EventEmitter();

  // would be localized in an actual application
  public readonly weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  public isSameDay(leftDate: Date, rightDate: Date) {
    return isSameDay(leftDate, rightDate);
  }

  public isSameWeek(leftDate: Date, rightDate: Date) {
    return isSameWeek(leftDate, rightDate, { weekStartsOn: 1 });
  }

  public getFormattedDateTitle(date: Date): string {
    return format(date, 'MMMM yyyy');
  }

  public dayHasAppointment(date: Date): boolean {
    return this.appointments.some((appointment) =>
      isSameDay(new Date(appointment.date), date)
    );
  }
}

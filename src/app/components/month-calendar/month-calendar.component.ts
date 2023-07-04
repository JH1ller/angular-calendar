import { Component, EventEmitter, Input, Output } from '@angular/core';
import { format, isSameDay, isSameWeek } from 'date-fns';

@Component({
  selector: 'im-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss'],
})
export class MonthCalendarComponent {
  @Input() currentDate: Date;
  @Input() calendarWeeks: Date[][];
  @Output() changeDate = new EventEmitter<Date>();
  @Output() prevMonth = new EventEmitter();
  @Output() nextMonth = new EventEmitter();

  public isSameDay(leftDate: Date, rightDate: Date) {
    return isSameDay(leftDate, rightDate);
  }

  public isSameWeek(leftDate: Date, rightDate: Date) {
    return isSameWeek(leftDate, rightDate, { weekStartsOn: 1 });
  }

  public getMonthName(date: Date): string {
    return format(date, 'MMMM');
  }

  // would be localized in an actual application
  public readonly weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
}

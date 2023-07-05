import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppointmentsState } from '../../state/appointments/appointments.state';
import { Observable, Subscription } from 'rxjs';
import { Appointment } from '../../models/dtos/appointment.model';
import {
  FetchData,
  SetCurrentDate,
  SetDateNextMonth,
  SetDateNextWeek,
  SetDatePrevMonth,
  SetDatePrevWeek,
} from '../../state/appointments/appointments.actions';
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  getDay,
  setDate,
  subDays,
  addDays,
  isSameWeek,
} from 'date-fns';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';

@Component({
  selector: 'im-appointment-overview',
  templateUrl: './appointment-overview.component.html',
  styleUrls: ['./appointment-overview.component.scss'],
})
export class AppointmentOverviewComponent implements OnInit, OnDestroy {
  @Select(AppointmentsState.appointments)
  public appointments$: Observable<Appointment[]>;

  @Select(AppointmentsState.currentDate)
  public currentDate$: Observable<Date>;

  private currentDateSubscription: Subscription;

  public currentWeek: Date[];

  public calendarWeeks: Date[][];

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(new FetchData());
    this.currentDateSubscription = this.currentDate$.subscribe((date) => {
      // recalculate calendarWeeks when currentDate value changes
      this.calendarWeeks = this.getCalendarWeeksForCurrentDate(date);
    });
  }

  public ngOnDestroy(): void {
    this.currentDateSubscription.unsubscribe();
  }

  @Dispatch()
  public setCurrentDate(date: Date) {
    return new SetCurrentDate(date);
  }

  @Dispatch()
  public prevMonth() {
    return new SetDatePrevMonth();
  }

  @Dispatch()
  public nextMonth() {
    return new SetDateNextMonth();
  }

  @Dispatch()
  public prevWeek() {
    return new SetDatePrevWeek();
  }

  @Dispatch()
  public nextWeek() {
    return new SetDateNextWeek();
  }

  // generates Date matrix to display a 7 x 6 calendar grid for the current date
  private getCalendarWeeksForCurrentDate(date: Date): Date[][] {
    const firstDayOfMonth = startOfMonth(date);

    const lastDayOfMonth = endOfMonth(date);

    const prevMonth = subMonths(date, 1);
    const prevMonthLastDay = endOfMonth(prevMonth);

    // week index (Mon = 0, Tue = 1 ...) of first day of month.
    // (n - 1 + 7) % 7 to convert Sun = 0 to Mon = 0
    const firstDayOfMonthAsWeekIndex = (getDay(firstDayOfMonth) - 1 + 7) % 7;

    const weeks = [];
    let currentDayIndex = 0;

    // iterate weeks
    for (let week = 0; week < 6; week++) {
      const calendarWeek: Date[] = [];

      // iterate week days
      for (let weekday = 0; weekday < 7; weekday++) {
        if (week === 0 && weekday < firstDayOfMonthAsWeekIndex) {
          // add days before first day of month
          const prevMonthDay = subDays(
            prevMonthLastDay,
            firstDayOfMonthAsWeekIndex - weekday - 1
          );
          calendarWeek.push(prevMonthDay);
        } else if (currentDayIndex + 1 > lastDayOfMonth.getDate()) {
          // add days after last day of month
          const dateAtIndex = setDate(date, currentDayIndex);
          const targetDate = addDays(dateAtIndex, 1);
          calendarWeek.push(targetDate);
          currentDayIndex++;
        } else {
          // add days of the month
          currentDayIndex++;
          calendarWeek.push(setDate(date, currentDayIndex));
        }
      }

      weeks.push(calendarWeek);
    }

    this.currentWeek = weeks.find((week) =>
      isSameWeek(week[0], date, { weekStartsOn: 1 })
    )!;

    return weeks;
  }
}

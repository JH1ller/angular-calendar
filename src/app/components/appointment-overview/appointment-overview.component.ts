import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppointmentsState } from '../../state/appointments/appointments.state';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Appointment } from '../../models/dtos/appointment.model';
import { FetchData } from '../../state/appointments/appointments.actions';
import { CalendarEvent } from 'calendar-utils';
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  addMonths,
  getDay,
  setDate,
  subDays,
  addDays,
  isSameWeek,
  subWeeks,
  addWeeks,
} from 'date-fns';

@Component({
  selector: 'im-appointment-overview',
  templateUrl: './appointment-overview.component.html',
  styleUrls: ['./appointment-overview.component.scss'],
})
export class AppointmentOverviewComponent implements OnInit, OnDestroy {
  @Select(AppointmentsState.appointments)
  public appointments$: Observable<Appointment[]>;

  @Select(AppointmentsState.events)
  public events$: Observable<CalendarEvent[]>;

  constructor(private store: Store) {}

  private currentDateSubscription: Subscription;

  public ngOnInit(): void {
    this.store.dispatch(new FetchData());
    this.currentDateSubscription = this.currentDate$.subscribe((date) => {
      this.calendarWeeks = this.getCalendarWeeksForCurrentDate(date);
    });
  }

  public ngOnDestroy(): void {
    this.currentDateSubscription.unsubscribe();
  }

  public currentDate$ = new BehaviorSubject(new Date());

  public currentWeek: Date[];

  public calendarWeeks: Date[][];

  public prevMonth(): void {
    this.currentDate$.next(subMonths(this.currentDate$.getValue(), 1));
  }

  public nextMonth(): void {
    this.currentDate$.next(addMonths(this.currentDate$.getValue(), 1));
  }

  public prevWeek(): void {
    this.currentDate$.next(subWeeks(this.currentDate$.getValue(), 1));
  }

  public nextWeek(): void {
    this.currentDate$.next(addWeeks(this.currentDate$.getValue(), 1));
  }

  private getCalendarWeeksForCurrentDate(date: Date): Date[][] {
    const firstDayOfMonth = startOfMonth(date);

    const lastDayOfMonth = endOfMonth(date);

    const prevMonth = subMonths(date, 1);
    const prevMonthLastDay = endOfMonth(prevMonth);

    const firstDayOfMonthAsWeekIndex = (getDay(firstDayOfMonth) - 1 + 7) % 7;

    const weeks = [];
    let currentDayIndex = 0;

    for (let week = 0; week < 6; week++) {
      const calendarWeek: Date[] = [];

      for (let weekday = 0; weekday < 7; weekday++) {
        if (week === 0 && weekday < firstDayOfMonthAsWeekIndex) {
          const prevMonthDay = subDays(
            prevMonthLastDay,
            firstDayOfMonthAsWeekIndex - weekday - 1
          );
          calendarWeek.push(prevMonthDay);
        } else if (currentDayIndex + 1 > lastDayOfMonth.getDate()) {
          const dateAtIndex = setDate(date, currentDayIndex);
          const targetDate = addDays(dateAtIndex, 1);
          calendarWeek.push(targetDate);
          currentDayIndex++;
        } else {
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

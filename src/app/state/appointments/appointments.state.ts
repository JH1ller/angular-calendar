import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { FetchData } from './appointments.actions';
import { Appointment } from '../../models/dtos/appointment.model';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { tap } from 'rxjs';
import { CalendarEvent } from 'calendar-utils';
import { addHours } from 'date-fns';

export class AppointmentsStateModel {
  public items!: Appointment[];
}

const defaults: AppointmentsStateModel = {
  items: [],
};

@State<AppointmentsStateModel>({
  name: 'appointments',
  defaults,
})
@Injectable()
export class AppointmentsState {
  constructor(private appointmentsService: AppointmentsService) {}

  @Selector()
  static appointments(state: AppointmentsStateModel): Appointment[] {
    return state.items;
  }

  @Selector()
  static events(state: AppointmentsStateModel): CalendarEvent[] {
    return state.items.map((appointment) => {
      const date = new Date(appointment.date);

      return {
        start: date,
        end: addHours(date, 1),
        title: appointment.property.name,
        color: { primary: '#c8d2e0', secondary: '#e4ebf5' },
      };
    });
  }

  @Action(FetchData)
  async fetchData({ patchState }: StateContext<AppointmentsStateModel>) {
    return this.appointmentsService
      .getAppointments()
      .pipe(tap(({ data }) => patchState({ items: data.appointments.nodes })));
  }
}

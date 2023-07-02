import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { FetchData } from './appointments.actions';
import { Appointment } from '../../models/dtos/appointment.model';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { tap } from 'rxjs';

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

  @Action(FetchData)
  async fetchData({ patchState }: StateContext<AppointmentsStateModel>) {
    return this.appointmentsService
      .getAppointments()
      .pipe(tap(({ data }) => patchState({ items: data.appointments.nodes })));
  }
}

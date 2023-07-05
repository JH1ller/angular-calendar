import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  FetchData,
  SetCurrentDate,
  SetDateNextAppointment,
  SetDateNextMonth,
  SetDateNextWeek,
  SetDatePrevAppointment,
  SetDatePrevMonth,
  SetDatePrevWeek,
} from './appointments.actions';
import { Appointment } from '../../models/dtos/appointment.model';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { tap } from 'rxjs';
import { addMonths, addWeeks, isSameHour, subMonths, subWeeks } from 'date-fns';
import { AppointmentPropertyGroup } from 'src/app/models/appointments-property-group.model';

export interface AppointmentsStateModel {
  appointments: Appointment[];
  currentDate: Date;
}

const defaults: AppointmentsStateModel = {
  appointments: [],
  currentDate: new Date(),
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
    return state.appointments;
  }

  @Selector()
  static currentDate(state: AppointmentsStateModel): Date {
    return state.currentDate;
  }

  // group appointments by property
  @Selector()
  static currentAppointmentsByProperty(
    state: AppointmentsStateModel
  ): AppointmentPropertyGroup {
    return (
      state.appointments
        // filter out appointments that are not in the currently selected hour
        .filter((appointment) =>
          isSameHour(new Date(appointment.date), state.currentDate)
        )
        // group by property and add to new object map { propertyId: Appointments[] }
        .reduce<AppointmentPropertyGroup>(
          (acc, curr) => ({
            ...acc,
            [curr.property.id]: [...(acc[curr.property.id] ?? []), curr],
          }),
          {}
        )
    );
  }

  @Selector()
  static previousAppointment(
    state: AppointmentsStateModel
  ): Appointment | null {
    const { appointments, currentDate } = state;

    const previousAppointment = appointments
      // filter out appointments that aren't before the current date
      .filter((appointment) => new Date(appointment.date) < currentDate)
      // iterate appointments and find latest one
      .reduce<Appointment | null>((acc, curr) => {
        if (!acc) return curr;
        return new Date(curr.date) > new Date(acc.date) ? curr : acc;
      }, null);

    return previousAppointment;
  }

  @Selector()
  static nextAppointment(state: AppointmentsStateModel): Appointment | null {
    const { appointments, currentDate } = state;

    const nextAppointment = appointments
      // filter out appointments that aren't after the current date
      .filter((appointment) => new Date(appointment.date) > currentDate)
      // iterate appointments and find earliest one
      .reduce<Appointment | null>((acc, curr) => {
        if (!acc) return curr;
        return new Date(curr.date) < new Date(acc.date) ? curr : acc;
      }, null);

    return nextAppointment;
  }

  /**
   * Call appointment service to fetch latest appointment data.
   * In a real application it would make sense to transform the DTO to a local object format
   * e.g. to avoid redundant Date constructions throughout the app.
   */
  @Action(FetchData)
  fetchData({ patchState }: StateContext<AppointmentsStateModel>) {
    return this.appointmentsService
      .getAppointments()
      .pipe(
        tap(({ data }) => patchState({ appointments: data.appointments.nodes }))
      );
  }

  @Action(SetCurrentDate)
  setCurrentDate(
    { patchState }: StateContext<AppointmentsStateModel>,
    action: SetCurrentDate
  ) {
    return patchState({ currentDate: action.date });
  }

  @Action(SetDatePrevMonth)
  setDatePrevMonth({
    patchState,
    getState,
  }: StateContext<AppointmentsStateModel>) {
    return patchState({ currentDate: subMonths(getState().currentDate, 1) });
  }

  @Action(SetDateNextMonth)
  setDateNextMonth({
    patchState,
    getState,
  }: StateContext<AppointmentsStateModel>) {
    return patchState({ currentDate: addMonths(getState().currentDate, 1) });
  }

  @Action(SetDatePrevWeek)
  setDatePrevWeek({
    patchState,
    getState,
  }: StateContext<AppointmentsStateModel>) {
    return patchState({ currentDate: subWeeks(getState().currentDate, 1) });
  }

  @Action(SetDateNextWeek)
  setDateNextWeek({
    patchState,
    getState,
  }: StateContext<AppointmentsStateModel>) {
    return patchState({ currentDate: addWeeks(getState().currentDate, 1) });
  }

  @Action(SetDatePrevAppointment)
  setDatePrevAppointment({
    patchState,
    getState,
  }: StateContext<AppointmentsStateModel>): AppointmentsStateModel | void {
    const state = getState();
    const previousAppointment = AppointmentsState.previousAppointment(state);

    if (previousAppointment) {
      return patchState({ currentDate: new Date(previousAppointment.date) });
    }
  }

  @Action(SetDateNextAppointment)
  setDateNextAppointment({
    patchState,
    getState,
  }: StateContext<AppointmentsStateModel>): AppointmentsStateModel | void {
    const state = getState();
    const nextAppointment = AppointmentsState.nextAppointment(state);

    if (nextAppointment) {
      return patchState({ currentDate: new Date(nextAppointment.date) });
    }
  }
}

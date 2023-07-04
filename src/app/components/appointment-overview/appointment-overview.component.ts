import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppointmentsState } from '../../state/appointments/appointments.state';
import { Observable } from 'rxjs';
import { Appointment } from '../../models/dtos/appointment.model';
import { FetchData } from '../../state/appointments/appointments.actions';
import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'appointment-overview',
  templateUrl: './appointment-overview.component.html',
  styleUrls: ['./appointment-overview.component.scss'],
})
export class AppointmentOverviewComponent {
  @Select(AppointmentsState.appointments)
  public appointments$: Observable<Appointment[]>;

  @Select(AppointmentsState.events)
  public events$: Observable<CalendarEvent[]>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(new FetchData());
  }
}

import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Property } from 'src/app/models/dtos/property.model';
import { addHours, format } from 'date-fns';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Select, Store } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import {
  SetDateNextAppointment,
  SetDatePrevAppointment,
} from 'src/app/state/appointments/appointments.actions';
import { AppointmentsState } from 'src/app/state/appointments/appointments.state';
import { Observable } from 'rxjs';
import { AppointmentPropertyGroup } from 'src/app/models/appointments-property-group.model';

@Component({
  selector: 'im-appointment-dialog',
  templateUrl: 'appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatIconModule],
})
export class AppointmentDialog {
  @Select(AppointmentsState.previousAppointment)
  public previousAppointment$: Observable<Date | null>;

  @Select(AppointmentsState.nextAppointment)
  public nextAppointment$: Observable<Date | null>;

  @Select(AppointmentsState.currentDate)
  public currentDate$: Observable<Date>;

  @Select(AppointmentsState.currentAppointmentsByProperty)
  public currentAppointmentsByProperty$: Observable<AppointmentPropertyGroup>;

  constructor(private store: Store) {}

  @Dispatch()
  public goToPrevAppointment() {
    return new SetDatePrevAppointment();
  }

  @Dispatch()
  public goToNextAppointment() {
    return new SetDateNextAppointment();
  }

  public getFormattedPropertyAddress(property: Property): string {
    const { city, houseNumber, street, country, zipCode } = property.address;
    return `${street} ${houseNumber}, ${zipCode} ${city}, ${country}`;
  }

  public getFormattedAppointmentDate(dateString: string): string {
    return format(new Date(dateString), 'd MMMM yyyy');
  }

  public getFormattedAppointmentTime(dateString: string): string {
    return format(new Date(dateString), 'kk:mm');
  }

  public getFormattedCurrentDay(hour: Date): string {
    return format(hour, 'EEEE, d MMMM yyyy');
  }

  public getFormattedCurrentHour(hour: Date): string {
    return `${format(hour, 'kk:mm')} - ${format(addHours(hour, 1), 'kk:mm')}`;
  }
}

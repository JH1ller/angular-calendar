import { Appointment } from 'src/app/models/dtos/appointment.model';

export interface AppointmentPropertyGroup {
  [id: string]: Appointment[];
}

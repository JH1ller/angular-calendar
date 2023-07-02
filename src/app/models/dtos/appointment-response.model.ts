import { Appointment } from './appointment.model';

export interface AppointmentResponse {
  data: {
    appointments: {
      nodes: Appointment[];
    };
  };
}

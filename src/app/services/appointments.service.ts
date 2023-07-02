import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentResponse } from '../models/dtos/appointment-response.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private readonly appointmentsUrl = '/assets/mock/data.json';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  public getAppointments(): Observable<AppointmentResponse> {
    return this.http.get<AppointmentResponse>(
      this.appointmentsUrl,
      this.httpOptions
    );
  }
}

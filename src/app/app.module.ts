import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// state imports
import { AppointmentsState } from './state/appointments/appointments.state';

import { AppointmentOverviewComponent } from './components/appointment-overview/appointment-overview.component';
import { MonthCalendarComponent } from './components/month-calendar/month-calendar.component';
import { WeekCalendarComponent } from './components/week-calendar/week-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentOverviewComponent,
    MonthCalendarComponent,
    WeekCalendarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([AppointmentsState]),
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

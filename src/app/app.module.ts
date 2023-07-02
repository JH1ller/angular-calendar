import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// state imports
import { AppointmentsState } from './state/appointments/appointments.state';
import { AppointmentOverviewComponent } from './components/appointment-overview/appointment-overview.component';

@NgModule({
  declarations: [AppComponent, AppointmentOverviewComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([AppointmentsState]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

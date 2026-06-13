import { Component, ChangeDetectionStrategy } from '@angular/core';



@Component({
  selector: 'app-appointment-calendar',
  imports: [],
  templateUrl: './appointment-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './appointment-calendar.component.css'
})
export class AppointmentCalendarComponent {


  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }
}

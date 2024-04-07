import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit{

  daysOfWeek: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  monthDaysArray: number[] = [];
  firstDayOfWeek: number;

  ngOnInit(): void {
    const currentDate = new Date();
    // Get year and month
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    // Create a new date object for the first day of next month
    const firstDayOfNextMonth = new Date(year, month, 1);
    // Subtract 1 day from the first day of next month to get the last day of the current month
    const lastDayOfMonth = new Date(firstDayOfNextMonth.getTime() - 1);
    // Get the day of the month from the last day of the current month
    const numberOfDaysInMonth = lastDayOfMonth.getDate();

    const numberOfTheWeek = this.getFirstDayOfWeek(year, month);
    for (let i = 1; i <= numberOfTheWeek; i++) {
      this.monthDaysArray.push(0);
    }
    for (let i = 1; i <= numberOfDaysInMonth; i++) {
      this.monthDaysArray.push(i);
    }
  }

  getFirstDayOfWeek(year: number, month: number): number {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    return  firstDayOfMonth.getDay() - 1
}

}

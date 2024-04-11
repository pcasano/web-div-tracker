import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchData } from '../store/actions/data.actions';
import { selectData, selectDataLoading, selectDataError } from '../store/selectors/data.selectors';
import { Data } from '../store/models/data.model';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit{

  constructor(private store: Store<{data: any}>) {
    this.data$ = store.pipe(select(selectData));
    this.loading$ = store.pipe(select(selectDataLoading));
    this.error$ = store.pipe(select(selectDataError));
  }

  data$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  companies: any[] = [];

  daysOfWeek: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  monthDaysArray: number[] = [];
  firstDayOfWeek: number;


  dividendDay: number[] = [1, 1 ,1 , 11, 22, 24, 30, 30];

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


    // Fetch data when the component initializes
    

    this.data$.subscribe(
      {
        next: (res) => {
          if(res) {
            res.forEach((company: any) => this.companies.push({
              id: company.id,
              name: company.name,
              dividendPaymentDate: company.dividendPaymentDate
            }));
          }
          console.log(res);
        }, 
        error: (error) => console.error('Error fetching data:', error)
      }
    )
    this.store.dispatch(fetchData());
  }

  getFirstDayOfWeek(year: number, month: number): number {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    return  firstDayOfMonth.getDay() - 1
}

  getDividendsDayForCalendar(givenDay: number): number[] {
    return this.dividendDay.filter(day => day===givenDay);
  }

  showDividends(givenDay: number) {
    this.dividendDay.filter(day => day===givenDay).forEach(div => console.log(div));
  }

}
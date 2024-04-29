import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyStore } from '../store/company-store';
import { Company } from '../store/models/company.model';
import { ContentObserver } from '@angular/cdk/observers';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  providers: [CompanyStore],
})
export class CalendarComponent implements OnInit{

  //companies$: Observable<Company[]>;

  companies$ = this.companyStore.companies$;

  constructor(private readonly companyStore: CompanyStore) {}

  companies: Company[] | undefined | null = [];
  companyInProgress: boolean;
  companyError: HttpErrorResponse | undefined | null = null;

  companiesToDisplay: Company[] | undefined | null = [];
  selectedDay: number;

  isCompanyHovered: boolean = false;
  companyToDisplayOnHover: Company;

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
    this.companyStore.companies$.subscribe(cs => this.companies = cs);
    this.companyStore.companyInProgress$.subscribe(progress => this.companyInProgress = progress);
    this.companyStore.companyError$.subscribe(error => this.companyError = error);

    }

  getFirstDayOfWeek(year: number, month: number): number {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    return  firstDayOfMonth.getDay() - 1
}

  getDividendsDayForCalendar(givenDay: number): Company[] | undefined | null {
    return this.companies?.filter(
      dividend => this.isInCurrentMonth(dividend.dividendPaymentDate) && this.isSameDay(dividend.dividendPaymentDate, givenDay));
  }

  showDividendsGivenDay(givenDay: number) {
    this.companiesToDisplay = [];
    this.companiesToDisplay = this.getDividendsDayForCalendar(givenDay);
    this.companiesToDisplay?.forEach(company => console.log(company));
    this.selectedDay = givenDay;
  }

  showDividendsCurrentMonth() {
    this.companiesToDisplay = [];
    this.companiesToDisplay = this.companies?.filter(
      dividend => this.isInCurrentMonth(dividend.dividendPaymentDate));
      this.companiesToDisplay?.forEach(company => console.log(company));
  }

  showFullPortfolio() {
    this.companiesToDisplay = [];
    this.companiesToDisplay = this.companies;
    this.companies?.forEach(company => console.log(company));
  }

  isInCurrentMonth(dateString: string): boolean {
    const parts = dateString.split('.');
    if (parts.length !== 3) {
        throw new Error("Invalid date format. Expected dd.MM.yyyy");
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based in JavaScript
    const year = parseInt(parts[2], 10);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    return currentYear === year && currentMonth === month;
}

  isSameDay(dateString: string, calendarDay: number ): boolean {
    const parts = dateString.split('.');
    if (parts.length !== 3) {
        throw new Error("Invalid date format. Expected dd.MM.yyyy");
    }
    const day = parseInt(parts[0], 10);
    return day === calendarDay;
}

  setCompanyToDisplayAfterHover(company: Company) {
    this.isCompanyHovered = true;
    this.companyToDisplayOnHover = company;
  }

}
import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { CompanyService } from "./services/company.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Observer, pipe, switchMap, tap } from "rxjs";
import { Company } from "./models/company.model";


export interface CompanyState {
  companies: Company[] | undefined | null;
  // companyInProgress: boolean;
  // companyError: HttpErrorResponse | undefined | null
}

// export const initCompanyState: CompanyState = {
//   companies: null,
//   companyInProgress: true,
//   companyError: null
// }

  @Injectable()
  export class CompanyStore extends ComponentStore<CompanyState> {

    constructor(private companyService: CompanyService) {
      super({companies: []});
    }

    readonly companies$ = this.select((state) => state.companies);

    private setCompanies = this.updater((state, companies: Company[]) => ({
      ...state,
      companies
    }));

    readonly fetchCompanies = this.effect(() => {
      return this.companyService.getCompanies().pipe(tap((companies) => this.setCompanies(companies)))
    });




    // readonly selectCompanies$: Observable<Company[] | undefined | null> = this.select((state: CompanyState) => state.companies);
    // readonly selectCompanyInProgress: Observable<boolean> = this.select((state: CompanyState) => state.companyInProgress);
    // readonly selectCompanyError$: Observable<HttpErrorResponse | undefined | null> = this.select((state: CompanyState) => state.companyError);








    // getCompanyEffect = this.effect(
    //   this.companyService.getCompanies().pipe(
    //     tapResponse<Company , HttpErrorResponse>(
    //       (company: Company) => console.log(""),
    //       (error: HttpErrorResponse) => console.log("");
    //     ))
    // )

    // readonly company$ = this.select(state => state.company);

    // fetchCompany(): void {
    //   this.companyService.fetchCompany().subscribe(company => {
    //     this.setState({ company });
    //   });
    // }



  }
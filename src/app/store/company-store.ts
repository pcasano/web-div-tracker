import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { CompanyService } from "./services/company.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Company } from "./models/company.model";


export interface CompanyState {
  companies: Company[] | undefined | null;
  companyInProgress: boolean;
  companyError: HttpErrorResponse | undefined | null
}

export const initCompanyState: CompanyState = {
  companies: null,
  companyInProgress: true,
  companyError: null
}

  @Injectable()
  export class CompanyStore extends ComponentStore<CompanyState> {

    constructor(private companyService: CompanyService) {
      super(initCompanyState);
    }

    readonly companies$ = this.select((state) => state.companies);
    readonly companyInProgress$ = this.select((state) => state.companyInProgress);
    readonly companyError$ = this.select((state) => state.companyError);

    private updateCompanies = this.updater((state: CompanyState, companies: Company[]) => ({
      ...state,
      companies: companies.map(company => ({...company, imagePath:"../../assets/images/" + company.id + ".png"})),
      companyInProgress: false,
      companyError: null
    }))

    private updateCompaniesError = this.updater((state: CompanyState, error: HttpErrorResponse) => ({
      ...state,
      companies: null,
      companyInProgress: false,
      companyError: error
    }));

    readonly getCompanies = this.effect(() => {

      return this.companyService.getCompanies().pipe(
        tapResponse<Company[], HttpErrorResponse>(
        (companies: Company[]) => this.updateCompanies(companies),
        (error: HttpErrorResponse) => this.updateCompaniesError(error)
      ))
    });

  }
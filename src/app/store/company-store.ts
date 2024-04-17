import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { CompanyService } from "./services/company.service";

  @Injectable()
  export class CompanyStore extends ComponentStore<any> {
    
    constructor(private companyService: CompanyService) {
      super({});
    }

    readonly company$ = this.select(state => state.company);

    fetchCompany(): void {
      this.companyService.fetchCompany().subscribe(company => {
        this.setState({ company });
      });
    }
  }
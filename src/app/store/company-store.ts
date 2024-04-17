import { Injectable } from "@angular/core";
import { Company } from "./models/company.model";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs/internal/Observable";
import { CompanyService } from "./services/company.service";

// export interface CompanyState {
//     companies: Company[];
//   }

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
// data.effects.ts

import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { fetchData, fetchDataSuccess, fetchDataFailure } from '../actions/data.actions';
import { DataService } from '../services/data.service';
import { Store } from '@ngrx/store';

@Injectable()
export class DataEffects {
  fetchData$ = createEffect(() => this.actions$.pipe(
    ofType(fetchData),
    map(() =>
      this.dataService.fetchData().subscribe(   
        { next:  
            (data) => this.store.dispatch(fetchDataSuccess({data})),
         error: error => of(fetchDataFailure({ error }))
    }))
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store
  ) {}
}

import { createAction, props } from '@ngrx/store';
import { Data } from '../models/data.model';


export const fetchData = createAction('[Data] Fetch Data');
export const fetchDataSuccess = createAction('[Data] Fetch Data Success', props<{ data: Data[] }>());
export const fetchDataFailure = createAction('[Data] Fetch Data Failure', props<{ error: any }>());

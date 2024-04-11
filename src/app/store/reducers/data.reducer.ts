import { createReducer, on } from '@ngrx/store';
import { Data } from '../models/data.model';
import { fetchData, fetchDataSuccess, fetchDataFailure } from '../actions/data.actions';

export interface DataState {
  data: Data[];
  loading: boolean;
  error: any;
}

export const initialState: DataState = {
  data: [],
  loading: false,
  error: null
};

const _dataReducer = createReducer(
  initialState,
  on(fetchData, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(fetchDataSuccess, (state, { data }) => { 
    // const newState = {...state};
    // newState.data = data;   
    // console.log(data)
    // return newState;
    return {
    ...state,
    data,
    loading: false,
    error: null
  }}),
  on(fetchDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export function dataReducer(state: DataState | undefined, action: any) {
  return _dataReducer(state, action);
}

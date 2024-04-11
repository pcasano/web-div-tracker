import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DataState } from '../reducers/data.reducer';

export const selectDataState = createFeatureSelector<DataState>('data');
export const selectData = createSelector(selectDataState, (state: DataState) => state.data);
export const selectDataLoading = createSelector(selectDataState, (state: DataState) => state.loading);
export const selectDataError = createSelector(selectDataState, (state: DataState) => state.error);

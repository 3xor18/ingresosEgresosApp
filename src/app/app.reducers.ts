import * as fromUi from './shared/us.reducer'
import { ActionReducerMap } from '@ngrx/store'
import * as fromAuth from './auth/auth.reducer'

export interface AppState {
    ui: fromUi.State;
    auth: fromAuth.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUi.uiReducer,
    auth: fromAuth.reducer
}
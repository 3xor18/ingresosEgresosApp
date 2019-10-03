import * as fromUi from './shared/us.reducer'
import { ActionReducerMap } from '@ngrx/store'
import * as fromAuth from './auth/auth.reducer'
//import * as fromIngresoEgresoReducer from './ingreso-egreso/ingreso-egreso.reducer'

export interface AppState {
    ui: fromUi.State;
    auth: fromAuth.AuthState;
    // ingresoEgreso: fromIngresoEgresoReducer.IngresoEgresoState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUi.uiReducer,
    auth: fromAuth.reducer,
    // ingresoEgreso: fromIngresoEgresoReducer.reducer
}
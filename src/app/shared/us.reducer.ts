
import * as fromUsAction from './ui.actions';
import { InitialState } from '@ngrx/store/src/models';

export interface State {
    isLoading: boolean;
}

const initState: State = {
    isLoading: false
};

export function uiReducer(state = initState, action: fromUsAction.acciones): State {

    switch (action.type) {
        // CREATE
        case fromUsAction.ACTIVAR_LOADING:
            return {
                isLoading: true
            }
        case fromUsAction.DESACTIVAR_LOADING:
            return {
                isLoading: false
            }

        default:
            return state;
    }
}

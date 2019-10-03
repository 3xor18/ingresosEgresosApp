import * as fromIngresoEgresoActions from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';

export interface IngresoEgresoState {
    items: IngresoEgreso[];
};

const initialState: IngresoEgresoState = {
    items: []
};

export function reducer(state = initialState, action: fromIngresoEgresoActions.Acciones): IngresoEgresoState {
    switch (action.type) {
        case fromIngresoEgresoActions.ClassActionTypes.SET_ITEMS: {
            return {
                items: [
                    ...action.items.map(item => {
                        return {
                            ...item
                        }
                    })
                ]
            };
        }

        case fromIngresoEgresoActions.ClassActionTypes.UNSET_ITEMS: {
            return {
                items: []
            };
        }

        default: {
            return state;
        }
    }
}
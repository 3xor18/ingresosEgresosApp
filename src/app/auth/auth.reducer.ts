import * as fromAuth from './auth.actions';
import { User } from './user.model';

export interface AuthState {
    user: User;
};

const initialState: AuthState = {
    user: null
};

export function reducer(state = initialState, action: fromAuth.Acciones): AuthState {
    switch (action.type) {
        case fromAuth.ClassActionTypes.SET_USER: {
            return {
                user: {
                    ...action.user
                }
            };
        }

        case fromAuth.ClassActionTypes.UNSET_USER: {
            return {
                user: null
            };
        }

        default: {
            return state;
        }
    }
}
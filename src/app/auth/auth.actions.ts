import { Action } from '@ngrx/store';
import { User } from './user.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum ClassActionTypes {
    SET_USER = '[Auth] SetUser',
    UNSET_USER = '[Auth] UNSetUser'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class setUserActions implements Action {
    readonly type = ClassActionTypes.SET_USER;

    constructor(public user: User) { }
}

export class UnsetUserAction implements Action {
    readonly type = ClassActionTypes.UNSET_USER;
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Acciones
    = setUserActions | UnsetUserAction;

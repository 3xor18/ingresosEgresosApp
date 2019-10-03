import { Action } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum ClassActionTypes {
    SET_ITEMS = '[Ingreso-Egreso] Set Items',
    UNSET_ITEMS = '[Ingreso-Egreso] UNSet Items',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class SetitemsActions implements Action {
    readonly type = ClassActionTypes.SET_ITEMS;

    constructor(public items: IngresoEgreso[]) { }
}

export class UnSetItemsActions implements Action {
    readonly type = ClassActionTypes.UNSET_ITEMS;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Acciones
    = SetitemsActions
    | UnSetItemsActions;

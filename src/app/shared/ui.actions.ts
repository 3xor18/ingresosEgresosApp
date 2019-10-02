import { Action } from '@ngrx/store';

export const ACTIVAR_LOADING = '[UI LOADING] Cargando...';
export const DESACTIVAR_LOADING = '[UI LOADING] Fin De Carga...';

export class activarLoadingAction implements Action {
    readonly type = ACTIVAR_LOADING;
}

export class desactivarLoadingAction implements Action {
    readonly type = DESACTIVAR_LOADING;
}


export type acciones
    = activarLoadingAction | desactivarLoadingAction;


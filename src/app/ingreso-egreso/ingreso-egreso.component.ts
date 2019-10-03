import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { Subscription } from 'rxjs';
import { activarLoadingAction, desactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  public forma: FormGroup;
  tipo = 'ingreso';
  cargando: boolean;
  loadinSuscription: Subscription = new Subscription();

  constructor(public ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.loadinSuscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);

    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0))
    })
  }

  ngOnDestroy(): void {
    this.loadinSuscription.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch(new activarLoadingAction)
    const ingresoEgreso = new IngresoEgreso({ ...this.forma.value, tipo: this.tipo });
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.forma.reset({ monto: 0 });
        this.store.dispatch(new desactivarLoadingAction)
        Swal.fire('Datos Almacenados', ingresoEgreso.descripcion, 'success')
      })
      ;


  }

}

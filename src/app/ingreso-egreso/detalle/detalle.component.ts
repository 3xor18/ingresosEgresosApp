import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromIER from '../ingreso-egreso.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  detalleSuscription: Subscription = new Subscription();

  constructor(private store: Store<fromIER.AppState>,
    public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.detalleSuscription = this.store.select('ingresoEgreso')
      .subscribe(ingresoEgreso => {
        this.items = ingresoEgreso.items;
      })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.detalleSuscription.unsubscribe();
  }

  borrarItem(uid: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then(res => { Swal.fire('Exito Al Borrar', 'Datos Borrados', 'success') })
      .catch(err => { Swal.fire('Error Al Intentar Borrar', err.message, 'error') });
  }
}

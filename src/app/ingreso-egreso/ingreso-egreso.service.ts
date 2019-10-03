import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { filter, map } from 'rxjs/operators';
import { SetitemsActions, UnSetItemsActions } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSuscription: Subscription = new Subscription();
  ingresoEgresoItemsSuscription: Subscription = new Subscription();

  constructor(private afBD: AngularFirestore,
    public authService: AuthService,
    private store: Store<AppState>) { }



  initIngresoEgresoListener() {
    this.ingresoEgresoListenerSuscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(auth => this.ingresoEgresoItems(auth.user.uid))
  }

  private ingresoEgresoItems(uid: string) {
    this.ingresoEgresoItemsSuscription = this.afBD.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            }
          })
        })
      )
      .subscribe((coleccion: any[]) => {
        this.store.dispatch(new SetitemsActions(coleccion))
      })
  }

  cancelarSuBscription() {
    this.ingresoEgresoItemsSuscription.unsubscribe();
    this.ingresoEgresoListenerSuscription.unsubscribe();
    this.store.dispatch(new UnSetItemsActions);
  }


  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const user = this.authService.getUsuario();
    return this.afBD.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({ ...ingresoEgreso })
  }

  borrarIngresoEgreso(uid: string) {
    const user = this.authService.getUsuario();
    return this.afBD.doc(`${user.uid}/ingresos-egresos/items/${uid}`)
      .delete()
      ;
  }
}

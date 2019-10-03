import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import * as firebase from 'firebase'
import { map } from 'rxjs/operators'
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import * as fromUi from '../shared/ui.actions';
import * as fromAuth from './auth.actions'
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSuscription: Subscription = new Subscription();
  private usuario: User;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private adBD: AngularFirestore,
    private store: Store<AppState>) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.userSuscription = this.adBD.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe((usuarioObj: any) => {
            const newUser = new User(usuarioObj);
            this.store.dispatch(new fromAuth.setUserActions(newUser))
            this.usuario = newUser;
          })
      } else {
        this.usuario = null;
        this.userSuscription.unsubscribe();
      }
    })
  }

  crearUsuario(nombre, email, password) {
    this.store.dispatch(new fromUi.activarLoadingAction)
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: email
        }

        this.adBD.doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigate(['/']);
            this.store.dispatch(new fromUi.desactivarLoadingAction)
          });
      })
      .catch(error => {
        console.error(error);
        this.store.dispatch(new fromUi.desactivarLoadingAction)
        Swal.fire('Error! Al Crear Usuario',
          error.message,
          'error')
      });
  }

  login(email: string, password: string) {
    this.store.dispatch(new fromUi.activarLoadingAction)
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(resp => {
        this.store.dispatch(new fromUi.desactivarLoadingAction)
        this.router.navigate(['/'])
      })
      .catch(error => {
        console.error(error);
        this.store.dispatch(new fromUi.desactivarLoadingAction)
        Swal.fire('Error! En El Login',
          'Clave O Correo Invalidos',
          'error')
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    Swal.fire('Bye Bye',
      'Hasta la Vista Baby!',
      'success')
    this.store.dispatch(new fromAuth.UnsetUserAction())
    this.router.navigate(['login']);
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      map(fbUser => {
        if (fbUser == null) { this.router.navigate(['/login']) }
        return fbUser != null
      }
      )
    );
  }

  getUsuario() {
    return { ...this.usuario }
  }
}

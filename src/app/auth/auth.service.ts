import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import * as firebase from 'firebase'
import { map } from 'rxjs/operators'
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private adBD: AngularFirestore) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {

    })
  }

  crearUsuario(nombre, email, password) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: email
        }

this.adBD.doc(`${user.uid}/usuario`).set(user).then(()=>this.router.navigate(['/']))
        this.router.navigate(['/'])
      })
      .catch(error => {
        console.error(error);
        Swal.fire('Error! Al Crear Usuario',
          error.message,
          'error')
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(resp => {
        console.log(resp);
        this.router.navigate(['/'])
      })
      .catch(error => {
        console.error(error);
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
}

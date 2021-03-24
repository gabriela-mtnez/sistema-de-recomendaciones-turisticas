import { Injectable } from '@angular/core';
// import { auth } from 'firebase/app';
// import { firebase } from '../../../../node_modules/firebase/app';
// import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class AuthService {

  public user : firebase.User;
  //Cambiar los any por una interface de usuario
  users: Observable<any>;
  private usersCollection: AngularFirestoreCollection<any>;

  constructor( public afAuth : AngularFireAuth, private readonly afs: AngularFirestore) {
    this.usersCollection = afs.collection<any>('users');
   }

  async login(email:string, password:string){
    try{
      const result = await  this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async register(email:string, password:string){
    try {
      const result = await  this.afAuth.createUserWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.log(error);
    }
    
  }

  registerUser(name:string, surname:string,email:string, password:string, birthday:Date): Promise<void>{
    return new Promise(async (resolve,reject) => {
      try {
        const id = this.afs.createId();
        const data = {id, name, surname, email, password, birthday};
        const result = await this.usersCollection.doc(id).set(data);
        resolve(result);
      } catch (error){
        reject(error.message);
      }
    })
  }

  async logout(){
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  } 

  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}

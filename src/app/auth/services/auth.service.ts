import { Injectable } from '@angular/core';
// import { auth } from 'firebase/app';
// import { firebase } from '../../../../node_modules/firebase/app';
// import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

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

  registerUser(name:string, surname:string,email:string, password:string, birthday:Date, gender: string): Promise<void>{
    return new Promise(async (resolve,reject) => {
      try {
        const id = this.afs.createId();
        localStorage.setItem('idUser', id);
        const data = {id, name, surname, email, password, birthday, gender};
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
      localStorage.removeItem('idUser');
    } catch (error) {
      console.log(error);
    }
  } 

  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  getUserProfile(){
    var userProfile = {};
    var user = firebase.auth().currentUser;
    // var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      userProfile = {
        name : user.displayName,
        email : user.email,
        photoUrl : user.photoURL,
        emailVerified : user.emailVerified,
        uid : user.uid
      }
    }
    return userProfile;
  }

  registSelectedPlaces(selectedPlaces:any[]){
    var userId = localStorage.getItem('idUser');
    return new Promise(async (resolve,reject) => {
      try {
        const data = {selectedPlaces};
        const userRef = await this.usersCollection.doc(userId);
        var setWithMerge = userRef.set({data}, { merge: true });
        resolve(setWithMerge);
      } catch (error){
        reject(error.message);
      }
    })
  }

  async getUserPlaces(userEmail: string){
    var db = firebase.firestore();
    var query = {};
    await db.collection("users").where("email", "==", userEmail).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          query = doc.data();
      });
    }).catch((error) => {
      console.log("Error getting documents: ", error);
    });
    return query;
  }

}

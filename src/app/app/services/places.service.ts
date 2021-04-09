import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
// import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  places: Observable<any[]>;

  private placesCollection: AngularFirestoreCollection<any>;

  constructor(private readonly afs: AngularFirestore) {
    this.placesCollection = afs.collection<any>('places');
    this.getPlaces();
   }

   private getPlaces():void{
    this.places = this.placesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data()))
    );
   }

   async getPlacesById(placeId){
    var db = firebase.firestore();
    var query = {};
    await db.collection("places").where("idLugar", "==", placeId).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          query = doc.data();
      });
    }).catch((error) => {
      console.log("Error getting documents: ", error);
    });
    return query;
   }
}

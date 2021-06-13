import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
// import * as firebase from 'firebase';
import { Observable, throwError } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import firebase from 'firebase/app';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  places: Observable<any[]>;
  private urlAPI = 'https://us-central1-carritos.cloudfunctions.net/algoritmoDeRecomendaciones';
  public APIkey = 'AIzaSyDSTS4TzrzallQIpq9dJhnfeYc2DibuXeA';

  private placesCollection: AngularFirestoreCollection<any>;

  constructor(private readonly afs: AngularFirestore, private http:HttpClient) {
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


  callRecomendationsAlgorith(selectedPlacesObject: any):Observable<any>{
    const headers = { 'content-type': 'application/json'};
    return this.http.post<any>(this.urlAPI, selectedPlacesObject,{headers:headers});
  }

  getPlacesReviews(place_id):Observable<any>{
    const placesAPI = 'https://maps.googleapis.com/maps/api/place/details/json?';
    return this.http.get<Config>(placesAPI + "place_id=" + place_id + "&fields=reviews,rating,user_ratings_total,formatted_phone_number,opening_hours,geometry&key=" + this.APIkey);
  }

  async getPlacesByName(placeName){
    var db = firebase.firestore();
    var query = {};
    await db.collection("places").where("nombreLugar", "==", placeName).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          query = doc.data();
      });
    }).catch((error) => {
      console.log("Error getting documents: ", error);
    });
    return query;
  }
}

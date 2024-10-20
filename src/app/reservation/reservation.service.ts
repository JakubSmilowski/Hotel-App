//Here w handle data of all the reservations

import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ResolveStart } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Dependencies injections means that we can in any component inject this service in the constructor so we can use that
@Injectable({
  providedIn: 'root'
})
export class ReservationService{
  
  //Here we specify api url
  private apiUrl = "http://localhost:3001";

  //Constructor is invoked before onInit. Constructor is called as soon as an instance of a class is created
  // constructor() {
  //    let savedReservations = localStorage.getItem("Reservations");
  //    this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  // }

  constructor( private http: HttpClient){} //we use dependencies injection

  private reservations: Reservation[] = [];

  //CRUD Create Read Update and Delete

  //We are sending the request to the api,
  //we create an observable , that everyone can subscripe to
  //and w8 for the result. 
  getReservations(): Observable<Reservation[]> {
    //This returns an observable type, we make a http request to api with apiUrl + /reservations
    return this.http.get<Reservation[]>(this.apiUrl + "/reservations");
  }

  getReservation(id:string): Reservation | undefined {
    return this.reservations.find(res => res.id == id);
  }

  //we push the reservation the this function recives into the reservations list
  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString( );

    this.reservations.push(reservation);
    console.log(this.reservations);
    // this.saveToLocalStorage();
  }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(res => res.id === id)
    this.reservations.splice(index,1);
    // this.saveToLocalStorage();
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations[index] = updatedReservation;
    // this.saveToLocalStorage();
  }

  // saveToLocalStorage(){
  //   localStorage.setItem('Reservations', JSON.stringify(this.reservations))
  // }

}

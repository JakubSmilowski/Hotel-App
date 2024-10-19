//Here w handle data of all the reservations

import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ResolveStart } from '@angular/router';
import { JsonPipe } from '@angular/common';

//Dependencies injections means that we can in any component inject this service in the constructor so we can use that
@Injectable({
  providedIn: 'root'
})
export class ReservationService{

  //Constructor is invoked before onInit. Constructor is called as soon as an instance of a class is created
  constructor() {
     let savedReservations = localStorage.getItem("Reservations");
     this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  }

  private reservations: Reservation[] = [];

  //CRUD Create Read Update and Delete

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id:string): Reservation | undefined {
    return this.reservations.find(res => res.id == id);
  }

  //we push the reservation the this function recives into the reservations list
  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString( );

    this.reservations.push(reservation);
    console.log(this.reservations);
    this.saveToLocalStorage();
  }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(res => res.id === id)
    this.reservations.splice(index,1);
    this.saveToLocalStorage();
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations[index] = updatedReservation;
    this.saveToLocalStorage();
  }

  saveToLocalStorage(){
    localStorage.setItem('Reservations', JSON.stringify(this.reservations))
  }

}

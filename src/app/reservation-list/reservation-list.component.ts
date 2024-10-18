import { Component,OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';


@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {
  
  //Here we create a list 
  reservations: Reservation[] = [];
  
  //We use dependencies injection to include service
  constructor(private reservationService: ReservationService) {

  }

  //And on init we update the list with the values from local storage.
  ngOnInit(): void {
    this.reservations = this.reservationService.getReservations();
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id);
  }
  
}

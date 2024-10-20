import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
  
  
  //We create a form of Form Group wich we will use to validate form later
  reservationForm: FormGroup = new FormGroup({}); 

  //Here we initialize the formBuilder in the constructor, as soon as the reservationFormComponet class 
  //This way we can use it later in the class 

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router, 
    private activatedRoute: ActivatedRoute){
  }
  
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      //names has to be the same as in html
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      // we create array inside an array to create multiple validatiors
      guestEmail: ['',[ Validators.required, Validators.email]], 
      roomNumber: ['', Validators.required],
    });

    let id = this.activatedRoute.snapshot.paramMap.get("id");

    if(id){
      this.reservationService.getReservation(id).subscribe(reservation => {
          if(reservation){
            this.reservationForm.patchValue(reservation); 
          }
      });

    }
  }

  onSubmit(){
    if(this.reservationForm.valid){
      let reservation: Reservation = this.reservationForm.value;
      
      let id = this.activatedRoute.snapshot.paramMap.get("id");
      
      if(id) {
        //Update
        this.reservationService.updateReservation(id,reservation).subscribe(()=> console.log("Update Request procesed "));
      }else{
        this.reservationService.addReservation(reservation).subscribe(()=> console.log("Add Request processed "));

      }


      this.router.navigate(['/list']);

    }

  }

}

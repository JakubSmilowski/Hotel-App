import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';

//hERE WE ATTACH THE HOME
const routes: Routes = [
  {path:"", component: HomeComponent}, 
  {path:"list", component: ReservationListComponent},
  {path:"new", component: ReservationFormComponent},
  //We create a path that will forward us to a same reservation component with the id of a given reservation
  {path:"edit/:id", component: ReservationFormComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

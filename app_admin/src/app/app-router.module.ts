import { NgModule } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";
import { TripListingComponent } from "./trip-listing/trip-listing.component";
import {AddTripComponent} from './add-trip/add-trip.component';
import {EditTripComponent} from './edit-trip/edit-trip.component';

const routes:Routes=[
    {path: 'add-trip', component:AddTripComponent},
    {path:'edit-trip',component:EditTripComponent},
    {path:'login',component:LoginComponent},
    {path:'list-trips',component:TripListComponent},
    {path:'', component:HomeComponent,pathMatch:'full'}
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}

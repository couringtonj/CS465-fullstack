import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let tripCode=localStorage.getItem("tripCode");
    if(!tripCode){
      alert("Something wrong I couldnt find where I stashed the trip code!");
      this.router.navigate(['']);
      return;


    }
  
 //initialize form
 this.editForm=this.formBuilder.group({
    _id:[],
    code:[tripCode,Validators.required],
    name:['',Validators.required],
    length:['',Validators.required],
    start:['',Validators.required],
    resort:['',Validators.required],
    perPerson:['',Validators.required],
    image:['',Validators.required],
    description:['',Validators.required]

 })
 this.tripService.getTrip(tripCode)
  .then(data=>{
    console.log(data);
    this.editForm.patchValue(data);

  })
}
onSubmit(){
  this.submitted=true;
  if(this.editForm.valid){
    this.tripService.updateTrip(this.editForm.value)
      .then(data=>{
        console.log(data);
        this.router.navigate(['']);
      })
  }
}
}

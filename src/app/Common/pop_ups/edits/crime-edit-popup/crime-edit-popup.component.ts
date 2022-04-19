import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrimeService } from 'src/app/services/crime.service';

@Component({
  selector: 'app-crime-edit-popup',
  templateUrl: './crime-edit-popup.component.html',
  styleUrls: ['./crime-edit-popup.component.scss']
})
export class CrimeEditPopupComponent implements OnInit {

  constructor(private service:CrimeService,@Inject(MAT_DIALOG_DATA) public data:any , ) { }

  ngOnInit(): void {
    this.addcrime.patchValue({
      adminid:this.data.crime.adminid,
      category:this.data.crime.category,
      title:this.data.crime.title,
      description:this.data.crime.description,
      lawOfCrime:this.data.crime.lawOfCrime,
    })
  }

  addcrime = new FormGroup({
    adminid: new FormControl(''),
    category: new FormControl('',[Validators.required]),
    title: new FormControl('',[Validators.required, Validators.minLength(6)]),
    description: new FormControl('',[Validators.required, Validators.minLength(20)]),
    lawOfCrime: new FormControl('',[Validators.required, Validators.minLength(10)]),

  });

  updateCrime(){
    this.service.updateCrime(this.addcrime.value, this.data.crime.id ).subscribe((data)=>{
      alert("update success");
      console.log(data);
      location.reload();
      },
      (error)=>{
      console.log(error)
      }
    );
  }

}

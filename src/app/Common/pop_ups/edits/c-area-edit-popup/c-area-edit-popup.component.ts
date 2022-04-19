import { Component, Inject,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrimeAreaService } from 'src/app/services/crime-area.service';

@Component({
  selector: 'app-c-area-edit-popup',
  templateUrl: './c-area-edit-popup.component.html',
  styleUrls: ['./c-area-edit-popup.component.scss']
})
export class CAreaEditPopupComponent implements OnInit {

  constructor(private service : CrimeAreaService, @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    // patch the data for update 
    this.crimeArea.patchValue({
      adminid: this.data.area.adminid,
      date: this.data.area.date,
      areaCode: this.data.area.areaCode,
      category: this.data.area.category,
      title: this.data.area.title,
      description: this.data.area.description,
      location: this.data.area.location,
      start_date_time: this.data.area.start_date_time,
      end_date_time: this.data.area.end_date_time,
     
    })
  }

  crimeArea = new FormGroup({
    
    adminid: new FormControl(''),
    areaCode: new FormControl(''),
    date:new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
    title: new FormControl('',[Validators.required, Validators.minLength(6),Validators.maxLength(50)]),
    description: new FormControl('',[Validators.required, Validators.minLength(20)]),
    location: new FormControl('',[Validators.required, Validators.minLength(20)]),
    start_date_time: new FormControl('',[Validators.required]),
    end_date_time: new FormControl('',[Validators.required]),

    
  })

  updateArea(){
    this.service.updateArea(this.crimeArea.value, this.data.area.id).subscribe((data:any)=>{
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

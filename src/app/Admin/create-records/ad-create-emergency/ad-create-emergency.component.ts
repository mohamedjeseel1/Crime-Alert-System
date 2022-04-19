import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmergencyService } from 'src/app/services/emergency.service';


@Component({
  selector: 'app-ad-create-emergency',
  templateUrl: './ad-create-emergency.component.html',
  styleUrls: ['./ad-create-emergency.component.scss']
})
export class AdCreateEmergencyComponent implements OnInit {

  constructor(private service:EmergencyService) { }

  ngOnInit(): void {
  }

  emergencyAlert = new FormGroup({
    adminid:new FormControl(''),
    category: new FormControl('',[Validators.required]),
    date:new FormControl('',[Validators.required]),
    title: new FormControl('',[Validators.required, Validators.minLength(6),Validators.maxLength(50)]),
    description: new FormControl('',[Validators.required, Validators.minLength(20)]),
    location: new FormControl('',[Validators.required, Validators.minLength(20)]),    
  })

    // API ( backend functions)
   //Create form data
  createEmergency(){

    this.service.createEmergency(this.emergencyAlert.value).subscribe(
      (data:any)=>{
          console.log(data);
          alert("successfully added!")
      },
      (err:any)=>{ console.log(err)
      }
    );
  }

}

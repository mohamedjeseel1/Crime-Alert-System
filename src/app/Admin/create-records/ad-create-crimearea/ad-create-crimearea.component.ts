import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrimeAreaService } from 'src/app/services/crime-area.service';

@Component({
  selector: 'app-ad-create-crimearea',
  templateUrl: './ad-create-crimearea.component.html',
  styleUrls: ['./ad-create-crimearea.component.scss']
})
export class AdCreateCrimeareaComponent implements OnInit {

  constructor(private service:CrimeAreaService) { }

  ngOnInit(): void {
  }

  crimeArea = new FormGroup({
    adminid: new FormControl(''),
    date:new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
    title: new FormControl('',[Validators.required, Validators.minLength(6),Validators.maxLength(50)]),
    description: new FormControl('',[Validators.required, Validators.minLength(20)]),
    location: new FormControl('',[Validators.required, Validators.minLength(20)]),
    areaCode: new FormControl(''),
    start_date_time: new FormControl('',[Validators.required]),
    end_date_time: new FormControl('',[Validators.required])

    
  })

  createArea():void{
    this.service.createArea(this.crimeArea.value).subscribe((data)=>{
      alert("Created successfully");
      console.log(data);
    },
    (err:any)=>{ console.log(err)
    })
  }
}

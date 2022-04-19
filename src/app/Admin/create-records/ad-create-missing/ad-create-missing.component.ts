import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MissedService } from 'src/app/services/missed.service';

@Component({
  selector: 'app-ad-create-missing',
  templateUrl: './ad-create-missing.component.html',
  styleUrls: ['./ad-create-missing.component.scss']
})
export class AdCreateMissingComponent implements OnInit {

  constructor(private service: MissedService) { }

  ngOnInit(): void {
  }

  missingForm = new FormGroup({
    adminid:new FormControl(''),
    category: new FormControl('',[Validators.required]),
    identification:  new FormControl('',[Validators.required, Validators.maxLength(20)]),
    date:new FormControl('',[Validators.required]),
    location: new FormControl('',[Validators.required, Validators.minLength(10)]),
    description: new FormControl('',[Validators.required, Validators.minLength(20)]),
  })



  // API ( backend functions)
   //Create form data
  createMissed():void{
   
    this.service.createMissed(this.missingForm.value).subscribe(
      (data:any)=>{
          console.log(data);
          alert("successfully added!");
      },
      (err:any)=>{ console.log(err)
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrimeService } from 'src/app/services/crime.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-create-crime',
  templateUrl: './ad-create-crime.component.html',
  styleUrls: ['./ad-create-crime.component.scss']
})
export class AdCreateCrimeComponent implements OnInit {


  constructor(private service: CrimeService) { }

  addcrime = new FormGroup({
    adminid: new FormControl(''),
    category: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    description: new FormControl('', [Validators.required, Validators.minLength(20)]),
    lawOfCrime: new FormControl('', [Validators.required, Validators.minLength(10)]),

  })


  ngOnInit(): void {
    
  }

  createCrime() {
    this.service.createCrime(this.addcrime.value).subscribe((data) => {
      console.log(data);
      Swal.fire(
        'Successfully Created!',
        'You clicked the button!',
        'success'
      )
    },
      (err: any) => {
        console.log(err)
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { ComplaintsService } from 'src/app/services/complaints.service';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {


  constructor(public service: ComplaintsService) { }

  ngOnInit(): void {
  }

  create(){
    if(this.service.requestComplaint.value.id==0){
      this.service.createComplaint(this.service.requestComplaint.value).subscribe((data)=>{
        console.log(data);
    })
    }else{
      this.service.updateComplaint(this.service.requestComplaint.value,this.service.requestComplaint.value.id).subscribe((data)=>{
        console.log(data);
    })
    }
   
  }


  

}

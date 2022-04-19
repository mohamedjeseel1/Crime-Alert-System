import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserVerifypopupComponent } from 'src/app/Common/pop_ups/views/user-verifypopup/user-verifypopup.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-varify',
  templateUrl: './user-varify.component.html',
  styleUrls: ['./user-varify.component.scss']
})
export class UserVarifyComponent implements OnInit {

  apiBaseUrl ="localhost:8081/";

  users:any =[{
    id:"",
    username  : "", 
    role : "",
    password : "",
    cpassword : "",
    fullname : "",
    gender : "",
    image : "",
    nic : "",
    address : "",
    contact : "",
    email : "",
    status :"",
    createdAt: "",
    updatedAt: ""
  }];
  constructor(private service:UserService, private view_popup: MatDialog) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(){
    this.service.getAllUsers().subscribe((data:any)=>{
      console.log(data);
      this.users = data;
    })
  }

  viewUser(id:any){
     this.view_popup.open(UserVerifypopupComponent,{
        height: 'auto',
        width: '60%'
       
     })
  }

  deleteUser(id:any){
    this.service.deleteUser(id).subscribe(
      (data:any)=>{
      console.log(data);
      console.log("User deleted");
      this.getAllUser();
      },
      (error:any)=>{
      console.log(error);
        
      } 
    )
  }

}

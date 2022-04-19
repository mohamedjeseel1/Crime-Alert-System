import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss']
})
export class SidenavbarComponent implements OnInit {

  // validation +
  frmReqComplaint = this.fb.group({
    userid: [''],
    type: ['',[Validators.required, Validators.minLength(2)]],
    subject: ['',[Validators.required, Validators.minLength(2)]],
    descFile: [null],
    location: ['',[Validators.required]],
    
  });
  fileAttr = 'Choose File';
  selectedFile: File | null = null;

  loginForm: FormGroup ;
  
  constructor(private fb:FormBuilder,) {

   }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'userid' : new FormControl(null, [Validators.required]),
      'type' : new FormControl(null, [Validators.required]),
      'subject' : new FormControl(null, [Validators.required]),
      'descFile' : new FormControl(null, [Validators.required]),
      'location' : new FormControl(null, [Validators.required])
    });
  }

  submit():void{
    let user =  JSON.parse(sessionStorage.getItem('auth-user') || '{}');
    var formData: any = new FormData();
    formData.append("userid", this.frmReqComplaint.value.userid);
    formData.append("type", this.frmReqComplaint.value.type);
    formData.append("subject", this.frmReqComplaint.value.subject);
    formData.append("descFile", this.selectedFile);
    formData.append("location", this.frmReqComplaint.value.location);

    console.log(formData);
    // this.donService.doante(formData).subscribe(
    //   {
    //       next: (data:any) => {
    //         console.log(data);
    //       },  
    //       error: (err:any) => {
    //         Swal.fire({  
    //           icon: 'error',  
    //           title: 'Oops...',  
    //           text: "Something went wrong!",  
    //           footer: '<a href>Why do I have this issue?</a>'  
    //         })
    //         console.log(err);
    //       },
 
    //       complete: () => {
    //     console.info('complete');
    //     this.frmDonate.reset();
    //     this.selectedFile = null;
    //     //Open Payhere
    //     this.checkout();
    //    /*
    //     Note : In production mode this is not the currect order.
    //     First need to proceed payhere process and
    //     there after API endpoint provided as notify_url will call by payhere host
    //     and then using that endpoint we can store the Donation details in the databse
    //    */            
    //   }
    //   
    //   );
    }

    upload(event: any) {
      if (event.target.files.length > 0) {
        this.selectedFile = event.target.files[0];
        // this.fileAttr = this.selectedFile?.name || '';
      }
    }
  
}

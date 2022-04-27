import { Component, OnInit } from '@angular/core';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  user = {
    userId: '',
    username: '',
    role: '',
    fullname: '',
  };

  constructor(
    public service: ComplaintsService,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.userStorageService.getUser());
    // patch the current adminid
    this.service.requestComplaint.patchValue({
      userId: this.user.userId,
    });
  }

  create() {
    if (this.service.requestComplaint.value.id > 0) {
      console.log(this.service.requestComplaint.value.id);
      this.service
        .updateComplaint(
          this.service.requestComplaint.value,
          this.service.requestComplaint.value.id
        )
        .subscribe((data) => {
          console.log(data);
          Swal.fire({
            background: '',
            color: '',
            width: '',
            heightAuto: true,
            position: 'center',
            icon: 'success',
            title: 'Updated Successfully',
            showConfirmButton: true,
            timer: 1500,
          });
          location.reload();
        });
    } else {
      ////
      this.service
        .createComplaint(this.service.requestComplaint.value)
        .subscribe((data) => {
          console.log(data);

          Swal.fire({
            background: '',
            color: '',
            width: '',
            heightAuto: true,
            position: 'center',
            icon: 'success',
            title: 'Requested Successfully',
            showConfirmButton: true,
            timer: 1500,
          });

          location.reload();
        });
    }
  }
}

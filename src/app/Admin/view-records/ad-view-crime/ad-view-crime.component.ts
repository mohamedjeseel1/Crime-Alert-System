import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { CrimeEditPopupComponent } from 'src/app/Common/pop_ups/edits/crime-edit-popup/crime-edit-popup.component';
import { CrimeViewPopupComponent } from 'src/app/Common/pop_ups/views/crime-view-popup/crime-view-popup.component';
import { CrimeService } from 'src/app/services/crime.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-view-crime',
  templateUrl: './ad-view-crime.component.html',
  styleUrls: ['./ad-view-crime.component.scss'],
})
export class AdViewCrimeComponent implements OnInit {
  logged_user_role = '';
  apiBaseUrl = 'localhost:8081/';

  searchText: string;
  filtered_option: any;

  filter_options = [
    {
      name: 'ID',
      key: 'id',
    },

    {
      name: 'Title',
      key: 'title',
    },

    {
      name: 'Category',
      key: 'category',
    },
    {
      name: 'Date',
      key: 'date',
    },
  ];

  crimes: any = [
    {
      id: '',
      adminid: '',
      date: '',
      category: '',
      title: '',
      description: '',
      lawOfCrime: '',
      createdAt: '',
      updatedAt: '',
    },
  ];
  constructor(
    private view_popup: MatDialog,
    private crime: CrimeService,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    this.logged_user_role = JSON.parse(this.userStorageService.getUser()).role;
    this.getAllCrimes();
  }

  // Pop-Up
  openDialog(id: any) {
    const crime = this.crimes.filter((dataObj: any) => dataObj.id == id);
    if (crime.length == 0) return;
    this.view_popup.open(CrimeViewPopupComponent, {
      data: {
        crime: crime[0],
      },
      height: 'auto',
      width: '100%',
    });
  }

  // edit the arae - call popup & pass id
  edit(id: any) {
    const crime = this.crimes.filter((dataObj: any) => dataObj.id == id);
    // if not found id return 0
    if (crime.length == 0) return;

    // show the popup and pass id to popup
    this.view_popup.open(CrimeEditPopupComponent, {
      data: {
        crime: crime[0],
      },
      height: 'auto',
      width: '50%',
    });
  }

  getAllCrimes() {
    return this.crime.getAllCrimes().subscribe((data) => {
      this.crimes = data;
    });
  }

  deleteCrime(id: any) {
    return this.crime.deleteCrime(id).subscribe((data) => {
      this.crimes = data;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Deleted Successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      this.getAllCrimes();
    });
  }

  public GenerateReport() {
    let myCanvas = <HTMLCanvasElement>document.getElementById('print_mark');
    html2canvas(myCanvas).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('Crime_report.pdf'); // Generated PDF
    });
  }
}

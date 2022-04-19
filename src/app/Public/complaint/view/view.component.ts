import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { view } from '../class/view';
import { RequestComponent } from '../request/request.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  ELEMENT_DATA: view[]=[];

  displayedColumns:string[]=['crimeType','subject',
    'description',
    'document',
    'location', 'action'];

  dataSource = new MatTableDataSource<view>(this.ELEMENT_DATA);

 

  @ViewChild(MatPaginator)

  paginator!: MatPaginator;

  constructor(private view_popup: MatDialog,public service: ComplaintsService) { 
     
  }
 
  ngOnInit(): void {
    this.AllComplaints();
    console.log(this.dataSource)
  }

   // Pop-Up
   request(){
    this.view_popup.open(RequestComponent,{
      height: 'auto',
      width: '50%'
  });
  }
  
  AllComplaints(){

    this.service.getAllComplaints().subscribe((data:any)=>{
      this.dataSource.data=data as view[];
      this.dataSource.paginator=this.paginator;
    })
  }

  onEdit(element:any){
    console.log(element.id);
    this.service.iniform(element);
    this.view_popup.open(RequestComponent,{
      height: 'auto',
      width: '50%'
  });
  }
  onDelete(element:any){
    this.service.deleteComplaint(element.id).subscribe((data)=>{
      this.dataSource.data=data;
      this.AllComplaints();

    })
  }

 

}

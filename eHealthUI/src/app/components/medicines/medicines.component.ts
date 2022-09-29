import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator }                 from '@angular/material/paginator';
import { MatSort }                      from '@angular/material/sort';
import { MatTableDataSource }           from '@angular/material/table';
import { Medicine }                     from 'src/app/models/ui-models/medicine.model';
import { MedicineService }              from 'src/app/components/medicines/medicine.service';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})

export class MedicinesComponent implements OnInit
{
  medicines: Medicine[] = [];
  displayedColumns: string[] = ['id', 'medicineName', 'manufacturer', 'unitPrice','discount','quantity','disease','uses','expDate','imageUrl','status', 'edit'];

  dataSource: MatTableDataSource<Medicine> = new MatTableDataSource<Medicine>();

  //Kiru-Paginator
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;

  //Kiru-Sorting
  @ViewChild(MatSort) matSort!: MatSort;

  filterString ='';
Medicine: any;

  constructor(private medicineService: MedicineService) { }

  ngOnInit(): void
  {
    //Fetch Medicines
    this.medicineService.getAllMedicines().subscribe
    ({
        next:(successResponse) =>
        {
          this.medicines = successResponse;
          this.dataSource = new MatTableDataSource<Medicine>(this.medicines);

          //Kiru-Paginator
          if(this.matPaginator)
          {
            this.dataSource.paginator = this.matPaginator;
          }

          //Kiru-Sorting
          if(this.matSort)
          {
            this.dataSource.sort = this.matSort;
          }

        },
        error: (errorResponse) =>
        {
          console.log(errorResponse);
        }
    });
  }

  filterMedicines(){
    this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
  }
}

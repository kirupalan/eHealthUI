import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Medicine } from 'src/app/models/ui-models/medicine.model';
import { MedicineService } from '../medicine.service';

@Component({
  selector: 'app-view-medicine',
  templateUrl: './view-medicine.component.html',
  styleUrls: ['./view-medicine.component.css']
})
export class ViewMedicineComponent implements OnInit
{
  medicineId: string | null | undefined;
  medicine: Medicine = {
    id: '',
    medicineName: '',
    manufacturer: '',
    unitPrice: 0,
    discount: 0,
    quantity: '',
    disease:'',
    uses:'',
    expDate:'',
    imageUrl:'',
    status:''
  }


  constructor(private readonly medicineService: MedicineService,
              private readonly route:ActivatedRoute,
              private snackbar: MatSnackBar){ }


  ngOnInit(): void
  {
    //Fetch Medicine
    this.route.paramMap.subscribe(
      (params) => {
        this.medicineId = params.get('id');

        if(this.medicineId) {
          this.medicineService.getMedicine(this.medicineId)
            .subscribe(
              (successResponse) => {
                //console.log(successResponse);
                this.medicine = successResponse;
              }
            )
        }
      }
    );
  }

  onUpdate(): void
  {
    this.medicineService.updateMedicine(this.medicine.id, this.medicine).subscribe
    (
      (successResponse) =>
      {
        //console.log(successResponse);
        //Show Notification
        this.snackbar.open('Medicine Updated Successfully', undefined, {duration: 1000});
      },
      (errorResponse) =>
      {
        //console.log(errorResponse);
        //Show Notification
        this.snackbar.open('Error Updating Medicine', undefined, {duration: 1000});
      }
    )
  }
}

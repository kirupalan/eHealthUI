import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
              private snackbar: MatSnackBar,
              private router: Router ){ }


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
        this.snackbar.open('Medicine Updated Successfully', undefined, {duration: 1000});
      },
      (errorResponse) =>
      {
        this.snackbar.open('Error Updating Medicine', undefined, {duration: 1000});
      }
    )
  }

onDelete(): void
{
  this.medicineService.deleteMedicine(this.medicine.id).subscribe
  (
    (successResponse) =>
    {
      this.snackbar.open('Medicine Deleted Successfully', undefined, {duration: 1000});
      setTimeout(() => {
        this.router.navigateByUrl('medicines');
      }, 2000);

    },
    (errorResponse) =>
    {
      this.snackbar.open('Error Deleting Medicine', undefined, {duration: 1000});
    }
  )
}

}

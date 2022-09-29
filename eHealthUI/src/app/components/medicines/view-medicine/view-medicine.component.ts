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
  };

  isNewMedicine = false;
  header = '';
  medicineImageURL ='';

  constructor(private readonly medicineService: MedicineService,
              private readonly route:ActivatedRoute,
              private snackbar: MatSnackBar,
              private router: Router ){ }


  ngOnInit(): void
  {
    //Fetch Medicine
    this.route.paramMap.subscribe((params) =>
    {
        this.medicineId = params.get('id');


        if(this.medicineId)
        {
          if(this.medicineId.toLowerCase() === 'Add'.toLowerCase())
          {
            // Add Medicine
            this.isNewMedicine = true;
            this.header = 'Add Medicine';
            this.setImage();
          }
          else
          {
            // Update Medicine
            this.isNewMedicine = false;
            this.header = 'Edit Medicine';
            this.medicineService.getMedicine(this.medicineId).subscribe
            (
              (successResponse) =>
              {
                this.medicine = successResponse;
                this.setImage();
              },
              (errorResponse) =>
              {
                this.setImage();
              }
            )
          }
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

      setTimeout(() => {this.router.navigateByUrl('medicines');}, 2000);
    },
    (errorResponse) =>
    {
      this.snackbar.open('Error Deleting Medicine', undefined, {duration: 1000});
    }
  )
}

onAdd(): void
{
  this.medicineService.addMedicine(this.medicine).subscribe
  (
    (successResponse) =>
    {
      this.snackbar.open('Medicine Added Successfully', undefined, {duration: 1000});

      setTimeout(() => {this.router.navigateByUrl(`medicines/${successResponse.id}`);}, 2000);
    },
    (errorResponse) =>
    {
      this.snackbar.open('Error Deleting Medicine', undefined, {duration: 1000});
    }
  )
}

private setImage(): void
{
  if(this.medicine.imageUrl)
  {
    this.medicineImageURL = this.medicineService.getImagePath(this.medicine.imageUrl);
  }
  else
  {
    this.medicineImageURL = '/assets/Default.jpg';
  }
}

  uploadImage(event: any): void
  {
    if(this.medicine.id)
    {
      const file: File = event.target.files[0];
      this.medicineService.uploadImage(this.medicine.id, file).subscribe
      (
        (successResponse) =>
        {
          this.medicine.imageUrl = successResponse;
          this.setImage();
          this.snackbar.open('Uploaded Image Successfully', undefined, {duration: 1000});
        },
        (errorResponse) =>
        {
          this.snackbar.open('Error Uploading Image', undefined, {duration: 1000});
        }
      )
    }
  }



}

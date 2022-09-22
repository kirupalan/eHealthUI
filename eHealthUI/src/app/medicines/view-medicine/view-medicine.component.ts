import { Component, OnInit } from '@angular/core';
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


  constructor(private readonly medicineService: MedicineService, private readonly route:ActivatedRoute){ }


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
}

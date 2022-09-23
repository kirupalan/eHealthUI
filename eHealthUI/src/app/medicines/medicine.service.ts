import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicine } from '../models/api-models/medicine.model';
import { UpdateMedicineRequest } from '../models/api-models/update-medicine-request.model';

@Injectable
(
  {
    providedIn: 'root'
  }
)

export class MedicineService
{
  private baseApiUrl = "https://localhost:7112";

  constructor(private httpClient: HttpClient) { }

  getAllMedicines(): Observable<Medicine[]>
  {
    return this.httpClient.get<Medicine[]>(this.baseApiUrl + '/Medicine')
  }

  getMedicine(medicineId: string): Observable<Medicine>
  {
    return this.httpClient.get<Medicine>(this.baseApiUrl + '/Medicine/' + medicineId)
  }

  updateMedicine(medicineId: string, medicineRequest: Medicine ): Observable<Medicine>
  {
    const updateMedicineRequest: UpdateMedicineRequest = {
      medicineName : medicineRequest.medicineName,
      manufacturer : medicineRequest.manufacturer,
      unitPrice : medicineRequest.unitPrice,
      discount : medicineRequest.discount,
      quantity : medicineRequest.quantity,
      disease : medicineRequest.disease,
      uses : medicineRequest.uses,
      expDate : medicineRequest.expDate,
      status : medicineRequest.status,
      imageUrl : medicineRequest.imageUrl
    }

    return this.httpClient.put<Medicine>(this.baseApiUrl + '/Medicine/' + medicineId, updateMedicineRequest);
  }

  deleteMedicine(medicineId: string): Observable<Medicine>
  {
    return this.httpClient.delete<Medicine>(this.baseApiUrl + '/Medicine/' + medicineId)
  }

}

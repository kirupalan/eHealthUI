import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicine } from '../models/api-models/medicine.model';

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
    return this.httpClient.get<Medicine[]>(this.baseApiUrl + '/medicine')
  }

  getMedicine(medicineId: string): Observable<Medicine>
  {
    return this.httpClient.get<Medicine>(this.baseApiUrl + '/medicine/' + medicineId)
  }
}

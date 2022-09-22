import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicinesComponent } from './medicines/medicines.component';
import { ViewMedicineComponent } from './medicines/view-medicine/view-medicine.component';

const routes: Routes = [
  {
    path: '',
    component: MedicinesComponent
  },
  {
    path: 'medicines',
    component: MedicinesComponent
  },
  {
    path: 'medicines/:id',
    component: ViewMedicineComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

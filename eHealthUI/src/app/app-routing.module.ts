import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicinesComponent } from './medicines/medicines.component';

const routes: Routes = [
  {
    path: '',
    component: MedicinesComponent
  },
  {
    path: 'medicines',
    component: MedicinesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

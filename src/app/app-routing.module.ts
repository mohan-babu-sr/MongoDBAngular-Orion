import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMedicineComponent } from './home/add-medicine/add-medicine.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'addMedicine',component:AddMedicineComponent},
  {path:'addMedicine/:id',component: AddMedicineComponent},
  {path:'', redirectTo:'dashboard', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

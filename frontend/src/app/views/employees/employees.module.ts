import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { CreateEmployeesComponent } from './create-employees/create-employees.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    EmployeesComponent,
    ListEmployeesComponent,
    CreateEmployeesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }

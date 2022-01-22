import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { CreateEmployeesComponent } from './create-employees/create-employees.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditEmployeesComponent } from './edit-employees/edit-employees.component';



@NgModule({
  declarations: [
    EmployeesComponent,
    ListEmployeesComponent,
    CreateEmployeesComponent,
    EditEmployeesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }

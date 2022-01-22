import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeesComponent } from './create-employees/create-employees.component';
import { EditEmployeesComponent } from './edit-employees/edit-employees.component';
import { EmployeesComponent } from './employees.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';

const routes: Routes = [{
    path: "",
    component: EmployeesComponent,
    children: [{
        path: 'list-employees',
        component: ListEmployeesComponent
    },
    {
        path: 'create-employees',
        component: CreateEmployeesComponent
    },{
        path: 'edit-employees',
        component: EditEmployeesComponent
        
    }]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeesRoutingModule { }

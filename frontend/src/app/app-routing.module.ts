import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [{
  path:"",
  component: HomeComponent
},
{
  path: 'employees',
  loadChildren: () => import('../app/views/employees/employees.module').then(m => m.EmployeesModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/employee.interface';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  public employees!: IEmployee[];
  public displayedColumns = ['name', 'email', 'occupation', 'action']

  constructor(
    private router: Router,
    private employeesService: EmployeesService) { }

  public ngOnInit(): void {
    this.loadEmployees();
  }

  private loadEmployees(): void {
    this.employeesService.findEmployees()
      .subscribe(result => {
        this.employees = result;
        console.log(this.employees);
      });
  }

  public redirectTo() {
    return this.router.navigateByUrl('employees/create-employees');
  }
  navigateToProductCreate(): void {
    this.router.navigate(['employees/create-employees'])
  }

  public edit(employee: IEmployee) {

    this.employeesService.updateData(employee);
    this.router.navigateByUrl('employees/edit-employees')


  }


}

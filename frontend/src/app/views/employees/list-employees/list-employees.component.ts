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
  public displayedColumns = ['name', 'email', 'occupation', 'salary','action']

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
      });
  }

  public redirectTo() {
    return this.router.navigateByUrl('employees/create-employees');
  }

  public edit(employee: IEmployee) {
    console.log(employee);
    
    this.employeesService.updateData(employee);
    this.router.navigateByUrl('employees/edit-employees')
  }

  public delete(id: number) {
    this.employeesService.deleteEmployee(id)
    .subscribe(result  => {
      this.loadEmployees();
    });
  }

}

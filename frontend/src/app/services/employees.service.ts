import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { IEmployee } from '../interfaces/employee.interface';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private destroy = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  public findEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>('http://localhost:3001/employees')
      .pipe(takeUntil(this.destroy))
      .pipe(catchError((err) => {
        console.log('err', err);
        return [];
      }))
      .pipe(map(result => result.map(employee => new Employee(employee))));
  }

  public createEmployee(body: IEmployee) {
    return this.http.post<IEmployee>('http://localhost:3001/employees', body)
    .pipe(takeUntil(this.destroy))
    .pipe(catchError((err) => {
      console.log('err', err);
      return [];
    }))
  }
}

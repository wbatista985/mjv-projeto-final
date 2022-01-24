import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { IAddress } from '../interfaces/address.interface';
import { IEmployee } from '../interfaces/employee.interface';
import { Address } from '../models/address.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private destroy = new Subject();
  private employeeSubject = new BehaviorSubject<IEmployee | null>(null);
  constructor(
    private http: HttpClient
  ) { }

  public findEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>('http://localhost:8080/funcionarios/listar')
      .pipe(takeUntil(this.destroy))
      .pipe(catchError((err) => {
        console.log('err', err);
        return [];
      }))
      .pipe(map(result => result.map((funcionario: any) => {
        const address: IAddress[] = [];

        const newAdress = new Address({
          street: funcionario.endereco.rua,
          number: funcionario.endereco.numero,
          city: funcionario.endereco.cidade,
          district: funcionario.endereco.estado,
          country: funcionario.endereco.pais,
          zipCode: funcionario.endereco.cep
        });

        address.push(newAdress);

        return new Employee({
          id: funcionario.id,
          name: funcionario.nome,
          document: funcionario.cpfCnpj,
          gener: funcionario.sexo,
          address: address,
          salary:funcionario.salario,
          email: funcionario.email,
          occupation: funcionario.profissao.nome,
          phone: []
        })
      })));
  }

  public createOccupation(body: any) {
    return this.http.post<any>('http://localhost:8080/profissao/inserir', body)
    .pipe(takeUntil(this.destroy))
    .pipe(catchError((err) => {
      console.log('err', err);
      return[]
    }))
  }

  public createEmployee(body: any) {
    return this.http.post<any>('http://localhost:8080/funcionarios/inserir', body)
      .pipe(takeUntil(this.destroy))
      .pipe(catchError((err) => {
        console.log('err', err);
        return [];
      }))
  }


  public updateData(value: IEmployee) {
    this.employeeSubject.next(value)

  }


  public getData() {
    return this.employeeSubject.value;
  }
}

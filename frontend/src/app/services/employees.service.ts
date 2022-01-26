import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { IAddress } from '../interfaces/address.interface';
import { IEmployee } from '../interfaces/employee.interface';
import { Address } from '../models/address.model';
import { Employee } from '../models/employee.model';
import { Occupation } from '../models/occupation.model';

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

        const phones = funcionario.telefones.map((telefone: string) => ({
          number: telefone
        }));

        const occupation = new Occupation({
          id: funcionario.profissao.id,
          occupation: funcionario.profissao.nome,
          salary: funcionario.profissao.salarioMedio
        });

        return new Employee({
          id: funcionario.id,
          name: funcionario.nome,
          document: funcionario.cpfCnpj,
          gener: funcionario.sexo,
          address: address,
          salary: funcionario.salarioMedio,
          email: funcionario.email,
          occupation: occupation,
          phone: phones
        })
      })));
  }

  public createOccupation(payload: any) {
    return this.http.post<any>('http://localhost:8080/profissao/inserir', payload)
      .pipe(takeUntil(this.destroy))
      .pipe(catchError((err) => {
        console.log('err', err);
        return []
      }))
  }

  public updateOccupation(payload: any) {
    return this.http.put<any>('http://localhost:8080/profissao/atualizar', payload)
      .pipe(takeUntil(this.destroy))
      .pipe(catchError((err) => {
        console.log('err', err);
        return []
      }))
  }

  public createEmployee(payload: any): Observable<IEmployee> {
    return this.http.post<IEmployee>('http://localhost:8080/funcionarios/inserir', payload)
      .pipe(takeUntil(this.destroy))
      .pipe(catchError((err) => {
        console.log('err', err);
        return [];
      }))
  }

  public updateEmployee(payload: any) {
    return this.http.put<any>('http://localhost:8080/funcionarios/atualizar', payload)
      .pipe(takeUntil(this.destroy))
      .pipe(catchError((err) => {
        console.log('err', err);
        return []
      }))
  }

  public deleteEmployee(id: number) {
    return this.http.delete<any>(`http://localhost:8080/funcionarios/deletar/${id}`)
      .pipe(takeUntil(this.destroy))
      .pipe(catchError((err) => {
        console.log('err', err);
        return [];
      }))
  }

  public addAvatar(id: string, file: File): Observable<number> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<any>(`http://localhost:8080/imagem/upload/${id}`, formData)
      .pipe(catchError((err) => {
        console.log('err', err);
        return [];
      }))
  }

  public donwloadAvatar(id: string) {
    return this.http.get(`http://localhost:8080/imagem/download/${id}`, {
      responseType: 'blob'
    })
    .pipe(result => result)
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

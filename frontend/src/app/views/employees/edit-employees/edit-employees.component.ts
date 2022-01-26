import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IEmployee } from 'src/app/interfaces/employee.interface';
import { IPhone } from 'src/app/interfaces/phone.interface';
import { IAddress } from 'src/app/interfaces/address.interface';
import { EmployeesService } from 'src/app/services/employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-employees',
  templateUrl: './edit-employees.component.html',
  styleUrls: ['./edit-employees.component.css']
})
export class EditEmployeesComponent implements OnInit {

  public employee: IEmployee | null = null;
  public form!: FormGroup;
  public phone!: FormArray;
  public address!: FormArray;

  constructor(
    private router: Router,
    private employeesService: EmployeesService
  ) { }

  public ngOnInit(): void {
    this.employee = this.employeesService.getData();

    if (!this.employee) {
      this.cancel();
    }
    this.buildForm();
  }

  public buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(
        this.employee && this.employee.name
          ? this.employee.name
          : '', Validators.required),
      email: new FormControl(
        this.employee && this.employee.email
          ? this.employee.email
          : '', Validators.required),
      occupation: new FormControl(
        this.employee && this.employee.occupation
          ? this.employee.occupation.occupation
          : '', Validators.required),
      document: new FormControl(
        this.employee && this.employee.document
          ? this.employee.document
          : '', Validators.required),
      salary: new FormControl(
        this.employee && this.employee.occupation.salary
          ? this.employee.occupation.salary
          : ''),
      phone: new FormArray(this.setFormArrayPhone(this.employee?.phone)),
      address: new FormArray(this.setFormArrayAdress(this.employee?.address))
    });

    this.phone = this.form.get('phone') as FormArray;
    this.address = this.form.get('address') as FormArray;
  }

  private setFormArrayPhone(phone: IPhone[] | undefined): AbstractControl[] {
    return phone && phone.length > 0 ?
      phone.map(phone => {
        return new FormGroup({
          number: new FormControl(phone.number, Validators.required),
        });
      }) : [];
  }

  public onSubmit() {
    const data = this.getValueForm();

    if (data) {
      this.updateOccupation(data);
    }
  }

  private updateOccupation(data: IEmployee) {
    const payload = {
      id: this.employee?.occupation.id,
      nome: data.occupation,
      salarioMedio: parseInt(data.salary)
    }
    this.employeesService.updateOccupation(payload)
      .subscribe(result => {
        if (result) {
          this.updateEmployee(data, result);
        }
      })
  }

  public updateEmployee(data: IEmployee, result: any) {

    const payload = {
      id: this.employee?.id,
      nome: data.name,
      cpfCnpj: data.document,
      email: data.email,
      sexo: data.gener,
      salarioMedio: data.salary,
      endereco: {
        rua: data.address[0].street,
        numero: data.address[0].number,
        cidade: data.address[0].city,
        estado: data.address[0].district,
        pais: data.address[0].country,
        cep: data.address[0].zipCode
      },
      profissao: {
        id: result.id,
        nome: result.nome,
        salarioMedio: result.salarioMedio
      },
      telefone1: data.phone[0].number
    };

    this.employeesService.updateEmployee(payload)
      .subscribe(() => {
        this.router.navigateByUrl('employees/list-employees');
      })
  }

  setFormArrayAdress(address: Array<IAddress> | undefined): AbstractControl[] {
    if (address && address.length > 0) {
      return address.map(itemAddress => {
        return new FormGroup({
          street: new FormControl(itemAddress.street, Validators.required),
          district: new FormControl(itemAddress.district, Validators.required),
          country: new FormControl(itemAddress.country, Validators.required),
          city: new FormControl(itemAddress.city, Validators.required),
          number: new FormControl(itemAddress.number, Validators.required),
          zipCode: new FormControl(itemAddress.zipCode, Validators.required),
        })
      })
    } else {
      return []
    }
  }

  public cancel() {
    this.router.navigateByUrl('employees/list-employees');
  }

  public getValueForm(): IEmployee {
    return this.form.value;
  }

}

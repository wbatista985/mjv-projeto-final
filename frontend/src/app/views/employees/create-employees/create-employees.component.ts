import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/employee.interface';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css']
})
export class CreateEmployeesComponent implements OnInit {
  public form!: FormGroup;
  public phone!: FormArray;
  public address!: FormArray;

  constructor(
    private router: Router,
    private employeesService: EmployeesService
  ) { }

  public ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      occupation: new FormControl('', Validators.required),
      document: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      phone: new FormArray([new FormGroup({
        number: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required)
      })]),
      address: new FormArray([new FormGroup({
        street: new FormControl('', Validators.required),
        district: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        number: new FormControl('', Validators.required),
        zipCode: new FormControl('', Validators.required),
      })])
    });

    this.phone = this.form.get('phone') as FormArray;
    this.address = this.form.get('address') as FormArray;
  }

  public onSubmit() {
    const data = this.getValueForm();

    if (data) {
      this.createOccupation(data);
    }
  }

  private createOccupation(data: IEmployee) {
    const payload = {
      nome: data.occupation,
      salarioMedio: parseInt(data.salary)
    }
    this.employeesService.createOccupation(payload)
    .subscribe(result => {
      if(result) {
        this.createEmployee(data, result);
      }
    })
  }

  private createEmployee(data: IEmployee, result: any) {

    const payload = {
      nome: data.name,
      cpfCnpj: data.document,
      email: data.email,
      salarioMedio: data.salary,
      endereco: {
        rua: data.address[0].street,
        numero: data.address[0].number,
        cidade: data.address[0].city,
        estado: data.address[0].district,
        pais: data.address[0].country,
        cep: data.address[0].zipCode
      },
      profissao: result,
      telefone1: data.phone[0].number
    };

    this.employeesService.createEmployee(payload)
      .subscribe(result => {
        console.log(result);
        this.router.navigateByUrl('employees/list-employees');
      });
  }

  public getValueForm(): IEmployee {
    return this.form.value;
  }

  public cancel() {
    this.router.navigateByUrl('employees/list-employees');
  }

}

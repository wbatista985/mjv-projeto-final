import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/employee.interface';
import { Address } from 'src/app/models/address.model';
import { Employee } from 'src/app/models/employee.model';
import { Phone } from 'src/app/models/phone.model';
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
    private router : Router,
    private employeesService: EmployeesService
  ) { }

  public ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      biography: new FormControl('', Validators.required),
      occupation: new FormControl('', Validators.required),
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
    let employye: IEmployee | null;

    const data = this.getValueForm();

    if (data) {
     /* {
        "id": 1,
        "nome": "string",
        "cpfCnpj": "40805240860",
        "sexo": "M",
        "endereco": {
            "rua": "string",
            "numero": "90",
            "cidade": "string",
            "estado": "sp",
            "pais": "string",
            "cep": "string"
        },
        "profissao": {
            "id": 1,
            "nome": null,
            "salarioMedio": null
        }
    }
    {
      id: 1,
      nome: 'string',
      cpfCnpj: '40805240860',
      sexo: 'M',
      endereco: {
        rua: 'string',
        numero: '90',
        cidade: 'string',
        estado: 'sp',
        pais: 'string',
        cep: 'string'
      },
      profissao: { id: 1, nome: null, salarioMedio: null }
    }
    */


      employye = new Employee({
        name: data.name,
        email: data.email,
        occupation: data.occupation,
        biography: data.biography,
        phone: data.phone.map(phone => new Phone(phone)),
        address: data?.address.map(address => new Address(address)),
      });
      
      this.employeesService.createEmployee(employye)
        .subscribe(result => {
          console.log(result);
          this.router.navigateByUrl('employees/list-employees');
        })
    }
  }

  public getValueForm(): IEmployee {
    return this.form.value;
  }

}

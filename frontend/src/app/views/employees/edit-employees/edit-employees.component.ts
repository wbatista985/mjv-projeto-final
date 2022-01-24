import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IEmployee } from 'src/app/interfaces/employee.interface';
import { IPhone } from 'src/app/interfaces/phone.interface';
import { IAddress } from 'src/app/interfaces/address.interface';
import { Employee } from 'src/app/models/employee.model';
import { Phone } from 'src/app/models/phone.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { Address } from 'src/app/models/address.model';
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
    this.buildForm();
  }

  public buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.employee && this.employee.name ? this.employee.name : '', Validators.required),
      email: new FormControl(this.employee && this.employee.email ? this.employee.email : '', Validators.required),
      occupation: new FormControl(this.employee && this.employee.occupation ? this.employee.occupation : '', Validators.required),
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
          type: new FormControl(phone.type, Validators.required)
        });
      }) : [];
  }

  public onSubmit() {
    let employye: IEmployee | null;

    const data = this.getValueForm();

    if (data) {
      
      employye = new Employee({
        name: data.name,
        email: data.email,
        occupation: data.occupation,
        salary: data.salary,
        document: data.document,
        phone: data.phone.map(phone => new Phone(phone)),
        address: data?.address.map(address => new Address(address)),
      });

      this.employeesService.createEmployee(employye)
        .subscribe(result => {
       this.router.navigateByUrl('employees/list-employees');
        })
    }
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

  public getValueForm(): IEmployee {
    return this.form.value;
  }

}

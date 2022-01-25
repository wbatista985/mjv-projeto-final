import { IAddress } from "../interfaces/address.interface";
import { IEmployee } from "../interfaces/employee.interface";
import { IOccupation } from "../interfaces/occupation.interface";
import { IPhone } from "../interfaces/phone.interface";
import { Address } from "./address.model";
import { Occupation } from "./occupation.model";
import { Phone } from "./phone.model";

export class Employee implements IEmployee {

    public id?: string | null;
    public name: string;
    public document?: string;
    public gener?: string;
    public email: string;
    public salary: string;
    public occupation: IOccupation;
    public phone: IPhone[];
    public address: IAddress[];

    constructor(employee?: IEmployee) {
        if (!employee) {
            this.id = null;
            this.name = '';
            this.document = '';
            this.gener = '';
            this.email = '';
            this.salary = '';
            this.occupation = new Occupation();
            this.phone = [];
            this.address = [];
        } else {
            this.id = employee.id;
            this.name = employee.name;
            this.document = employee.document;
            this.gener = employee.gener;
            this.email = employee.email;
            this.salary = employee.salary;
            this.occupation = new Occupation(employee.occupation);
            this.phone = employee.phone.map(phone => new Phone(phone));
            this.address = employee.address.map(address => new Address(address));
        }
    }

}
import { IAddress } from "../interfaces/address.interface";
import { IEmployee } from "../interfaces/employee.interface";
import { IPhone } from "../interfaces/phone.interface";
import { Address } from "./address.model";
import { Phone } from "./phone.model";

export class Employee implements IEmployee {
    public name: string;
    public email: string;
    public biography: string;
    public occupation: string;
    public phone: IPhone[];
    public address: IAddress[];

    constructor(employee?: IEmployee) {
        if (!employee) {
            this.name = '';
            this.email = '';
            this.biography = '';
            this.occupation = '';
            this.phone = [];
            this.address = [];
        } else {
            this.name = employee.name;
            this.email = employee.email;
            this.biography = employee.biography;
            this.occupation = employee.occupation;
            this.phone = employee.phone.map(phone => new Phone(phone));
            this.address = employee.address.map(address => new Address(address));
        }
    }

}
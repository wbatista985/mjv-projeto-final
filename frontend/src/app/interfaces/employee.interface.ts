import { IAddress } from "./address.interface";
import { IPhone } from "./phone.interface";

export interface IEmployee {
    name: string;
    email: string;
    biography: string;
    occupation: string;
    phone: IPhone[];
    address: IAddress[];
}
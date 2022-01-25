import { IAddress } from "./address.interface";
import { IOccupation } from "./occupation.interface";
import { IPhone } from "./phone.interface";

export interface IEmployee {
    id?: string | null;
    name: string;
    document?: string;
    salary: string;
    gener?: string;
    email: string;
    occupation: IOccupation;
    phone: IPhone[];
    address: IAddress[];
}
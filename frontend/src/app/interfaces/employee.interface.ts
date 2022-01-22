import { IAddress } from "./address.interface";
import { IPhone } from "./phone.interface";

export interface IEmployee {
    id?: string | null;
    name: string;
    document?: string;
    gener?: string;
    email: string;
    biography: string;
    occupation: string;
    phone: IPhone[];
    address: IAddress[];
}
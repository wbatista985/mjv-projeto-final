import { IPhone } from "../interfaces/phone.interface";

export class Phone implements IPhone {
    public number: string | null;

    constructor(phone?: IPhone) {
        if (!phone) {
            this.number = null;
        } else {
            this.number = phone.number;
        }
    }
}
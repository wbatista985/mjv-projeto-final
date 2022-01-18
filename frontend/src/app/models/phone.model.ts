import { IPhone } from "../interfaces/phone.interface";

export class Phone implements IPhone {
    public number: string | null;
    public type: string;

    constructor(phone?: IPhone) {
        if (!phone) {
            this.number = null;
            this.type = '';
        } else {
            this.number = phone.number;
            this.type = phone.type;
        }
    }
}
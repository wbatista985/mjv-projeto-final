import { IAddress } from "../interfaces/address.interface";

export class Address implements IAddress {
    public street: string;
    public district: string;
    public country: string;
    public city: string;
    public number: string;
    public zipCode: string;

    constructor(address?: IAddress) {
        if (!address) {
            this.street = ''
            this.district = ''
            this.country = ''
            this.city = ''
            this.number = ''
            this.zipCode = ''
        } else {
            this.street = address?.street;
            this.district = address?.district;
            this.country = address?.country;
            this.city = address?.street;
            this.number = address?.number;
            this.zipCode = address?.zipCode;
        }
    }


    formatZipCode() {}
}
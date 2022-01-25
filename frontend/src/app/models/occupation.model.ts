import { IOccupation } from "../interfaces/occupation.interface";

export class Occupation implements IOccupation {
	public id: string | number | null;
	public occupation: string;
	public salary: string;

	constructor(occupation?: IOccupation) {
		if (!occupation) {
			this.id = null;
			this.occupation = '';
			this.salary = '';
		} else {
			this.id = occupation.id;
			this.occupation = occupation.occupation;
			this.salary = occupation.salary;
		}

	}
}
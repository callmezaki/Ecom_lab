import { Orders } from "./orders";

export class Customer {
    id:any;
    firstName!: string;
    lastName!: string;
    email!: string;
    orders!:Orders
}

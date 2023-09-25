import { Customer } from "./customer";

export class Orders {
    orderTrackingNumber!:string;
    totalQuantity!:number;
    totalPrice!:number;
    dateCreated!:Date;
    customer!:Customer
}

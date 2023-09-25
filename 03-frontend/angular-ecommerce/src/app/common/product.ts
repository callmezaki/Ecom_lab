import { ProductCategory } from "./product-category";

export class Product {
    id!: any;
    sku!: string;
    name!: string;
    description!: string;
    category!: ProductCategory;
    unitPrice!: number;
    imageUrl!: string;
    active!: boolean;
    unitsInStock!: number;
    dateCreated!: Date;
    lastUpdated!: Date;

}

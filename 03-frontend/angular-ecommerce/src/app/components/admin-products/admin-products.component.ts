import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  products: Product[] = [];
  thePageNumber: number = 1;
  currentCategoryId: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  constructor(private productService: ProductService,
              private cdr: ChangeDetectorRef,
              private route: ActivatedRoute){}

  ngOnInit():void{
     this.productService.refreshNeeded$.subscribe(()=>{
       this.ProductsAll()
     })
    this.ProductsAll()
   }
  deleteProduct(product: any){
    this.productService.deleteProduct(product).subscribe(
       data=>{
        alert('Product deleted')
      }
    )
   }
   ProductsAll(){
    this.productService.getProductsAll()
     .subscribe(
      data=>{
        this.products = data;
        console.log(data)
      }
     );
    }
}

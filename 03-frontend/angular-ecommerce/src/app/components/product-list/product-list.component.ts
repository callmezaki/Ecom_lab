import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products: Product[] = [];
  // products2: Product[]=[];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = "";

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute){}

  //Post constructor
  ngOnInit(){
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    })
    // this.allProducts()
  }
  // allProducts(){
  //   this.productService.getAllProducts().subscribe(
  //     data=>{
  //       this.products2=data

  //     }
  //   )
  // }
  listProducts(){
    //We are performing search if has('keyword') is true.
    this.searchMode = this.route.snapshot.paramMap.has('keyword')

    if(this.searchMode){
      this.handleSearchProducts();
    }
    //If we are not searching show products by default.
    else{
      this.handleListProducts();
    }
  }
  handleSearchProducts(){
    //get keyword from search
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!
    //if we have different keyword then previous
    //set pageNumber to 1
    if(this.previousKeyword != theKeyword){
      this.thePageNumber=1
    }
    this.previousKeyword = theKeyword

    // console.log(`keyword=${theKeyword},thePageNumber=${this.thePageNumber}`)

    //search for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber-1,this.thePageSize,theKeyword).subscribe(
      data=>{
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number+1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;;
      }
    )
  }
  handleListProducts(){
    //check if "id" parameter is available
    //snapshot - state of route in given moment, 
    //paramMap - Map of all the route parameters
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      //get id and convert string to number
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      //default category id
      this.currentCategoryId = 1;
    }
    //Check if we have a different category then previous
    //Note: Angular will reuse component if it is currently being viewed.

    //if we have different category id then previous
    //then set thepageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1 
    }
    this.previousCategoryId = this.currentCategoryId
    // console.log(`CurrentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)

    this.productService.getProductListPaginate(this.thePageNumber-1,
                                               this.thePageSize,
                                               this.currentCategoryId)
                                               .subscribe(
                                                data=>{
                                                  this.products = data._embedded.products;
                                                  this.thePageNumber = data.page.number+1;
                                                  this.thePageSize = data.page.size;
                                                  this.theTotalElements = data.page.totalElements;

                                                  
                                                }
                                               );
  }
  updatePageSize(pageSize: any) {
    this.thePageSize=pageSize
    this.thePageNumber =1
    this.listProducts();
    }

    addToCart(theProduct: Product){
      // console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`)

      const theCartItem = new CartItem(theProduct)
      this.cartService.addToCart(theCartItem)

    }
} 
 
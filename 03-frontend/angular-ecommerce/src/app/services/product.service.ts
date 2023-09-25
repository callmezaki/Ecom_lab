import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { Product } from '../common/product';
import {map, tap} from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  private baseUrl = 'http://springtc.eu-north-1.elasticbeanstalk.com/api/products';
  private categoryUrl = 'http://springtc.eu-north-1.elasticbeanstalk.com/api/product-category';
  private deleteUrl = 'http://springtc.eu-north-1.elasticbeanstalk.com/api/products/delete'
  private addProductUrl = 'http://springtc.eu-north-1.elasticbeanstalk.com/api/products/add'
  private allCategories = 'http://springtc.eu-north-1.elasticbeanstalk.com/api/category/all';
  private allProducts = 'http://springtc.eu-north-1.elasticbeanstalk.com/api/products/all';
  private singleProduct = 'http://springtc.eu-north-1.elasticbeanstalk.com/api/products/all/id'

  constructor(private httpClient: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>()

  get refreshNeeded$(){
      return this._refreshNeeded$
  }

  deleteProduct(product: string):Observable<any>{
    return this.httpClient
    .delete<any>(`${this.deleteUrl}/${product}`)
    .pipe(
      tap(()=>{
        this._refreshNeeded$.next()
      })
     )
  }
  addProduct(product: Product):Observable<Product>{
    return this.httpClient
    .post<Product>(`${this.addProductUrl}`,product)
    .pipe(
      tap(()=>{
        this._refreshNeeded$.next()
      })
     )
  }
  getAllCategories():Observable<ProductCategory[]>{
    return this.httpClient.get<ProductCategory[]>(this.allCategories);
  }
  getProductsAll():Observable<Product[]>{
    return this.httpClient
    .get<Product[]>(this.allProducts);
  }
  getSingleProduct(id:number):Observable<Product>{
    return this.httpClient.get<Product>(`${this.singleProduct}/${id}`);
  }

  getProduct(theProductId: number): Observable<Product>{
    //need to build url
    const productUrl =`${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);

  }

  getProductList(theCategoryId:number): Observable<Product[]> {
      
      const searchUrl =`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`

      return this.getProducts(searchUrl);
  }

  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProducts> {
      
    const searchUrl =`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      +`&page=${thePage}&size=${thePageSize}`

    return this.httpClient.get<GetResponseProducts>(searchUrl)
}

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl =`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage: number, thePageSize: number, theKeyword: string): Observable<GetResponseProducts> {
      
    const searchUrl =`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                      +`&page=${thePage}&size=${thePageSize}`

    return this.httpClient.get<GetResponseProducts>(searchUrl)
}

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
  
  getAllProducts():Observable<Product[]>{
    return this.httpClient.get<GetResponseProducts>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
}

  getProductCategories():Observable<ProductCategory[]>{

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}
//Unwraps the json from springRest _embedded entry
interface GetResponseProducts{
  _embedded:{
    products: Product[]
  },
  page:{
    size:number,
    totalElements: number,
    totalPages: number,
    number:number,
  }

}
interface GetResponseProductCategory{
  _embedded:{
    productCategory: ProductCategory[]
  }
}
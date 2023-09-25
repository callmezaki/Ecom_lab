import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import { TCShopValidators } from 'src/app/validators/tcshop-validators';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {

   product: Product[]=[]
   categoryProduct: ProductCategory[] =[]
   productFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private productService: ProductService,){}
              
  ngOnInit(): void{
    this.productFormGroup = this.formBuilder.group({
        name: new FormControl('',
                    [Validators.required,Validators.minLength(4), TCShopValidators.notOnlyWhiteSpace]),
        sku: new FormControl('',
                    [Validators.required,Validators.minLength(3),TCShopValidators.notOnlyWhiteSpace]),
        description: new FormControl('',
                      [Validators.required,Validators.minLength(10),TCShopValidators.notOnlyWhiteSpace]),
        unitPrice: new FormControl('',
                              [Validators.required,TCShopValidators.notOnlyWhiteSpace]),
        imageUrl: new FormControl('',
                              [Validators.required,TCShopValidators.notOnlyWhiteSpace]),
        category: new FormControl('',
                              [Validators.required]),
        active: new FormControl(null,
                              [Validators.required]),
        unitsInStock: new FormControl('',
                              [Validators.required,TCShopValidators.notOnlyWhiteSpace]),
        dateCreated: new FormControl('',
                              [Validators.required,TCShopValidators.notOnlyWhiteSpace]),
        lastUpdated: new FormControl('',
                              [Validators.required,TCShopValidators.notOnlyWhiteSpace]),
    })
    this.productService.getAllCategories().subscribe(
      data=>{
        this.categoryProduct = data
        console.log(data)
      }
    )
  }
  get name(){return this.productFormGroup.get('name')}
  get sku(){return this.productFormGroup.get('sku')}
  get description(){return this.productFormGroup.get('description')}
  get unitPrice(){return this.productFormGroup.get('unitPrice')}
  get imageUrl(){return this.productFormGroup.get('imageUrl')}
  get category(){return this.productFormGroup.get('category')}
  get active(){return this.productFormGroup.get('active')}
  get unitsInStock(){return this.productFormGroup.get('unitsInStock')}
  get dateCreated(){return this.productFormGroup.get('dateCreated')}
  get lastUpdated(){return this.productFormGroup.get('lastUpdated')}
  
  onSubmit(){
    if(this.productFormGroup.invalid){
      //Touching all fields triggers the display of error msg.
      this.productFormGroup.markAllAsTouched()
      return
    }
  
    //set up new User
     let newProduct = new Product()
  //   //populate user form
    
   newProduct.name = this.productFormGroup.controls['name'].value
   newProduct.sku= this.productFormGroup.controls['sku'].value
   newProduct.description = this.productFormGroup.controls['description'].value
   newProduct.unitPrice = this.productFormGroup.controls['unitPrice'].value
   newProduct.imageUrl = this.productFormGroup.controls['imageUrl'].value
   newProduct.category = this.productFormGroup.controls['category'].value
   newProduct.active= this.productFormGroup.controls['active'].value
   newProduct.unitsInStock = this.productFormGroup.controls['unitsInStock'].value
   newProduct.dateCreated = this.productFormGroup.controls['dateCreated'].value
   newProduct.lastUpdated = this.productFormGroup.controls['lastUpdated'].value

     this.productService.addProduct(newProduct).subscribe({
      next: response =>{
        alert(`Product Created!`)
        console.log(response)
        this.router.navigate(['/admin/products'])      
      },
      error: err =>{
        alert(`There was an error:${err.message}`)
      }      
    })
  }

}

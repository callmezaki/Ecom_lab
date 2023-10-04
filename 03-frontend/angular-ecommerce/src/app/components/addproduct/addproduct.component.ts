import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {

  xmlData: string = ''; // To hold the XML input string
  response: string = ''; // To display the response from the server

  constructor(private router: Router, private productService: ProductService) {}

  onSubmit(): void {
    this.productService.createProductFromXml(this.xmlData).subscribe({
      next: response =>{
        alert(`Product Created!`)
        console.log(response)
        this.router.navigate(['/admin/products'])      
      },
      error: err =>{
        alert(`There was an error:${err.message}`)
      }
  });
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { TCShopFormService } from 'src/app/services/tcshop-form.service';
import { TCShopValidators } from 'src/app/validators/tcshop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number=0;

  creditCardYears: number[]=[]
  creditCardMonths: number[]=[]

  countries: Country[]=[]
  shippingAddressStates: State[]=[]
  billingAddressStates: State[]=[]


  constructor(private formBuilder: FormBuilder,
              private tcShopFormService: TCShopFormService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router){}

  ngOnInit(): void{

    this.reviewCartDetails()

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',
                    [Validators.required,Validators.minLength(4), TCShopValidators.notOnlyWhiteSpace]),
        lastName: new FormControl('',
                    [Validators.required,Validators.minLength(3),TCShopValidators.notOnlyWhiteSpace]),
        email: new FormControl('',
                              [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('',
        [Validators.required,Validators.minLength(6), TCShopValidators.notOnlyWhiteSpace]),
        city: new FormControl('',
        [Validators.required,Validators.minLength(3), TCShopValidators.notOnlyWhiteSpace]),
        state:new FormControl('',[Validators.required]),
        country:new FormControl('',[Validators.required]),
        zipCode: new FormControl('',
        [Validators.required,Validators.minLength(5), TCShopValidators.notOnlyWhiteSpace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('',
        [Validators.required,Validators.minLength(6), TCShopValidators.notOnlyWhiteSpace]),
        city: new FormControl('',
        [Validators.required,Validators.minLength(3), TCShopValidators.notOnlyWhiteSpace]),
        state:new FormControl('',[Validators.required]),
        country:new FormControl('',[Validators.required]),
        zipCode: new FormControl('',
        [Validators.required,Validators.minLength(5), TCShopValidators.notOnlyWhiteSpace])
      }),
      creditCard: this.formBuilder.group({
          cardType:new FormControl('',[Validators.required]),
          nameOnCard:new FormControl('',
          [Validators.required,Validators.minLength(8), TCShopValidators.notOnlyWhiteSpace]),
          cardNumber:new FormControl('',[Validators.required, Validators.pattern('[0-9]{16}'),Validators.minLength(16)]),
          securityCode:new FormControl('',[Validators.required, Validators.pattern('[0-9]{4}'),Validators.minLength(4)]),
          expirationMonth:[''],
          expirationYear:['']
      })
    })
    //populate credit card months,date starts from 0
    const startMonth: number = new Date().getMonth()+1
    console.log("Start month:"+startMonth)

    this.tcShopFormService.getCreditCardMonths(startMonth).subscribe(
      data=>{
        console.log("Retrivied credit card months"+JSON.stringify(data))
        this.creditCardMonths = data
      }
    )
    //populate countries
    this.tcShopFormService.getCountries().subscribe(
      data=>{
        this.countries = data
      }
    )
    //populate credit card years
    this.tcShopFormService.getCreditCardYears().subscribe(
      data=>{
        this.creditCardYears = data
      }
    )
  }
  reviewCartDetails() {
    //subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity=>{
        this.totalQuantity = totalQuantity
      }
    )
    this.cartService.totalPrice.subscribe(
      totalPrice=>{
        this.totalPrice = totalPrice
      }
    )
  }
  onSubmit(){
    // console.log("Submit button")
    // console.log(this.checkoutFormGroup.get('customer')?.value)
    // console.log("Country Address is:"+this.checkoutFormGroup.get('shippingAddress')?.value.country.name)
    // console.log("State Address is:"+this.checkoutFormGroup.get('shippingAddress')?.value.state.name)
    if(this.checkoutFormGroup.invalid){
      //Touching all fields triggers the display of error msg.
      this.checkoutFormGroup.markAllAsTouched()
      return
    }
    //set up order
    let order = new Order();
    order.totalPrice = this. totalPrice
    order.totalQuantity = this.totalQuantity
    //get cart items
    const cartItems = this.cartService.cartItems
    //create orderItems from cartItems
    let orderItems: OrderItem[] = [];
    for(let i=0;i<cartItems.length;i++){
      orderItems[i] = new OrderItem(cartItems[i])
    }
    //set up purchase
    let purchase = new Purchase()
    //populate purchase customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value
    //ShippingAddress
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state))
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country))
    purchase.shippingAddress.state = shippingState.name
    purchase.shippingAddress.country = shippingCountry.name
    //billingAddress
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state))
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country))
    purchase.billingAddress.state = billingState.name
    purchase.billingAddress.country = billingCountry.name
    //orders and orderitems
    purchase.order = order
    purchase.orderItems = orderItems
    //call Rest Api via checkoutService
    this.checkoutService.placeOrder(purchase).subscribe({
        next: response =>{
          alert(`Your order has been received.\n Order number: ${response.orderTrackingNumber}`)
          
          //reset cart
            this.resetCart()
        },
        error: err =>{
          alert(`There was an error:${err.message}`)
        }
      }
    )
  }
  resetCart() {
    //reset cart data
      this.cartService.cartItems = []
      this.cartService.totalPrice.next(0)
      this.cartService.totalQuantity.next(0)
    //reset the form
      this.checkoutFormGroup.reset()
    //navigate back to products page
      this.router.navigateByUrl("/products")
  }

  copyShippingAddressToBillingAddress(event: any) {
      if(event.target.checked){
        this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
        //bug fix for states in billingaddress
        this.billingAddressStates = this.shippingAddressStates
      }
      else{
        this.checkoutFormGroup.controls['billingAddress'].reset()
        //reset states too
        this.billingAddressStates=[]
      }
    }

    get firstName(){return this.checkoutFormGroup.get('customer.firstName')}
    get lastName(){return this.checkoutFormGroup.get('customer.lastName')}
    get email(){return this.checkoutFormGroup.get('customer.email')}

    get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street')}
    get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city')}
    get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state')}
    get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country')}
    get shippingAddressZipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode')}

    
    get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street')}
    get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city')}
    get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state')}
    get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country')}
    get billingAddressZipCode(){return this.checkoutFormGroup.get('billingAddress.zipCode')}

    get creditCardType(){return this.checkoutFormGroup.get('creditCard.cardType')}
    get creditCardName(){return this.checkoutFormGroup.get('creditCard.nameOnCard')}
    get creditCardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber')}
    get creditCardSecurityCode(){return this.checkoutFormGroup.get('creditCard.securityCode')}


    handleMonthsAndYears(){
      const creditCardFormGroup = this.checkoutFormGroup.get('creditCard')

      const currentYear: number = new Date().getFullYear()
      const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear)
      //if the current year equals selected, start month 1
      let startMonth: number;
      if(currentYear === selectedYear){
        startMonth = new Date().getMonth()+1
      }
      else{
        startMonth=1
      }
      this.tcShopFormService.getCreditCardMonths(startMonth).subscribe(
        data=>{
          this.creditCardMonths = data
        }
      )
    }
    getStates(formGroupName: string){
      const formGroup = this.checkoutFormGroup.get(formGroupName)

      const countryCode = formGroup?.value.country.code;
      const countryName = formGroup?.value.country.name;

      this.tcShopFormService.getStates(countryCode).subscribe(
        data=>{
          if(formGroupName === 'shippingAddress'){
            this.shippingAddressStates = data
          }
          else{
            this.billingAddressStates = data
          }
          //Select first state as default
          formGroup?.get('state')?.setValue(data[0])
        }
      )

    }
}
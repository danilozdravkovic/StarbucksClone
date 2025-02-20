import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { max } from 'rxjs';
import { UserService } from 'src/app/account/services/user.service';
import { ICartLine } from 'src/app/menu/interfaces/i-cart-line';
import { CartLineService } from 'src/app/menu/services/cart-line.service';
import { OrderLinesService } from 'src/app/menu/services/order-lines.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {

  constructor(
    private userService: UserService,
    private orderLinesService : OrderLinesService,
    private cartLineService : CartLineService,
    private snackBar : MatSnackBar
  ){}

  currentUser = localStorage.getItem("user");
  favouriteProducts:any[] = [];
  visibleProducts: any[] = [];
  currentIndex = 0;
  productsPerPage = 4;
  maxIndex=-1;
  dataToAddToCart:ICartLine = {
      productId:0,
      sizeId:0,
      addIns:[]
    };

  ngOnInit () : void {

    this.orderLinesService.refreshNeeded.subscribe({
      next:()=>{
       this.getUserFavouriteProducts();
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this.getUserFavouriteProducts();
    this.userService.loggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        const userJson = localStorage.getItem("user");
        if(userJson){
          this.currentUser=JSON.parse(userJson);
        }
      } else {
        this.currentUser = null;
      }
    });
  }

  getUserFavouriteProducts():void{
    this.orderLinesService.getAll().subscribe({
      next:(data)=>{
        this.favouriteProducts=data.data;
        console.log(this.favouriteProducts);
        this.updateVisibleProducts();
        this.maxIndex = this.favouriteProducts.length - this.productsPerPage;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  updateVisibleProducts() {
    this.visibleProducts = this.favouriteProducts.slice(
      this.currentIndex,
      this.currentIndex + this.productsPerPage
    );
  }

  nextSlide() {
    if (this.currentIndex + this.productsPerPage < this.favouriteProducts.length) {
      this.currentIndex++;
      this.updateVisibleProducts();
    }
  }

  previousSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateVisibleProducts();
    }
  }
  addToCart(product: any) {
    this.dataToAddToCart.productId=product.productId;
    this.dataToAddToCart.sizeId=product.productSizeId;
    this.dataToAddToCart.addIns = product.addIns.map((addIn: { addInName: string, id: number, pump: number | null }) => {
      const { addInName, ...rest } = addIn;
      return rest;
    });
    
    this.cartLineService.post(this.dataToAddToCart).subscribe({
      next:(data)=>{
        this.snackBar.open("Item added to cart.", "Close", {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
      },
      error:(err)=>{
        if (err.status === 422) {
          let errorMessages = err.error.map((errorItem: any) => `${errorItem.property}: ${errorItem.error}`).join('\n');
          this.snackBar.open(errorMessages, "Close", {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        } 
        else if(err.status===401){
          this.snackBar.open("You must be logged in to add item to cart.", "Close", {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
        else {
          this.snackBar.open("An error occurred. Please try again later.", "Close", {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      }
    })
  }

  removeFromFavorites(product : any): void{
    let toggleFavObj = {"productId":product.orderLineId,"tableName":"OrderLine"}
    this.cartLineService.toggleProductIsFavourite(toggleFavObj).subscribe({
      next:(data)=>{
        this.getUserFavouriteProducts();
      },
      error:(err)=>{

      }
    });
  }
}

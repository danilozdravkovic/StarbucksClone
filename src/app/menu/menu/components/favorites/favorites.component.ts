import { Component } from '@angular/core';
import { max } from 'rxjs';
import { UserService } from 'src/app/account/services/user.service';
import { OrderLinesService } from 'src/app/menu/services/order-lines.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {

  constructor(
    private userService: UserService,
    private orderLinesService : OrderLinesService
  ){}

  currentUser = localStorage.getItem("user");
  favouriteProducts:any[] = [];
  visibleProducts: any[] = [];
  currentIndex = 0;
  productsPerPage = 4;
  maxIndex=-1;

  ngOnInit () : void {

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
        this.maxIndex=Math.ceil(this.favouriteProducts.length/2);
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
      console.log(this.maxIndex,this.currentIndex);
    }
  }

  previousSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateVisibleProducts();
    }
  }
  addToCart(product: any) {
    console.log('Added to cart:', product);
    // Implement actual "Add to Cart" functionality here
  }
}

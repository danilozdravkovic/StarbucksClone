import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from 'src/app/menu/services/products.service';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { auto } from '@popperjs/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private productsService: ProductsService,
    private dialog: MatDialog) {
  }
  products: any;

  ngOnInit(): void {
    this.productsService.refreshNeeded.subscribe({
      next: () => {
        this.getAllProducts();
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getAll().subscribe({
      next: (data) => {
        this.products = data.data;
        console.log(this.products);

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

   edit(id: number): void {
  //   this.dialog.open(ProductCategoryComponent, {
  //     width: auto,
  //     height: auto,
  //     data: {
  //       id: id,
  //       categories: this.categories
  //     }
  //   });
   }

  delete(id: number): void {
    this.dialog.open(DeleteProductComponent, {
      width: auto,
      height: auto,
      data: {
        id: id
      }
    })
  }
}

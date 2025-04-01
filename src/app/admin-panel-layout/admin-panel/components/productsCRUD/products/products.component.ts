import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from 'src/app/menu/services/products.service';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { auto } from '@popperjs/core';
import { ProductComponent } from '../product/product.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private productsService: ProductsService,
              private dialog: MatDialog
            ) {
  }
  products: any;

  totalItems = 0;
  perPage = 10;
  currentPage = 0;

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
    this.productsService.getAll(this.perPage,this.currentPage+1).subscribe({
      next: (data) => {
        this.products = data.data;
        this.totalItems=data.totalCount;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

   edit(id: number): void {
    this.dialog.open(ProductComponent, {
      width: '50em',
      height: '45em',
      data: {
        id: id,
      }
    });
   }

  delete(id: number): void {
    this.dialog.open(DeleteProductComponent, {
      width: auto,
      height: auto,
      data: {
        id: id
      }
    });
  }


  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.perPage = event.pageSize;
    this.loadData();
  }

  loadData(){
    this.products=this.getAllProducts();
  }
}

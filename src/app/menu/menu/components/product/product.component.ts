import { Component } from '@angular/core';
import { ProductsService } from 'src/app/menu/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  constructor(private productsService:ProductsService,
              private route: ActivatedRoute,
              private router:Router) {}
  
  productToDisplay : any;

  ngOnInit() : void{
    const productId : number= +this.route.snapshot.paramMap.get('id')!;
    console.log(productId);
    this.productsService.getOne(productId).subscribe(product =>{
      if(product){
        this.productToDisplay=product
      }
      else{
        this.router.navigate(['**'])
      }
  });
    }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IProduct } from 'src/app/menu/interfaces/i-product';
import { IProductCategory, IProductCategoryPrint } from 'src/app/menu/interfaces/i-product-category';
import { ProductCategoriesService } from 'src/app/menu/services/product-categories.service';
import { ProductsService } from 'src/app/menu/services/products.service';


@Component({
  selector: 'app-products-menu',
  templateUrl: './products-menu.component.html',
  styleUrls: ['./products-menu.component.css']
})
export class ProductsMenuComponent implements OnInit {
  constructor(private productCategoriesService: ProductCategoriesService,
    private productsService: ProductsService
  ) { }
  originalCategories: any = [];
  products:any=[];
  categoriesWithProducts:any=[];
  // categories: IProductCategoryPrint[] = [];
  // categoriesWithProducts: any[] = [];
  categoriesWithProductsToBeFiltered: any[] = [];

  totalItems = 0;
  perPage = 3;
  currentPage = 0;
  paginatedCategories: any[] = [];

  ngOnInit(): void {
    this.productCategoriesService.getAll().subscribe({
      next: (categoryData) => {
        this.originalCategories = categoryData.data;
        this.getProductsAfterCategories();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  getProductsAfterCategories(): void {
    this.productsService.getAll().subscribe({
      next: (productData) => {
        this.products = productData.data;
        this.categoriesWithProducts = this.getCategoriesWithProducts(this.originalCategories, this.products);
        this.categoriesWithProductsToBeFiltered=this.categoriesWithProducts;
        this.paginateData();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  flattenCategoriesWithParents(categories: any[], parent: any = null): any[] {
    let result:any = [];
    categories.forEach(category => {
      category.parent = parent;
      result.push(category);
      if (category.children && category.children.length > 0) {
        result = result.concat(this.flattenCategoriesWithParents(category.children, category));
      }
    });
    return result;
  }
  
  getCategoriesWithProducts(categories: any[], products: any[]): any[] {
    const flatCategories = this.flattenCategoriesWithParents(categories);
    const categoryMap = new Map();
  
    // Create a map with categories and their parents
    flatCategories.forEach(category => {
      if (!category.children || category.children.length === 0) {
        // Add products to the category with no children
        category.products = products.filter(product => product.categoryId === category.id);
  
        // Get or create the parent entry in the map
        const parent = category.parent;
        if (parent) {
          if (!categoryMap.has(parent.id)) {
            categoryMap.set(parent.id, { ...parent, children: [] });
          }
          const parentEntry = categoryMap.get(parent.id);
          
          // Add the current category as a child category
          parentEntry.children.push(category);
        } else {
          // Add the current category if it has no parent (root category with no children)
          categoryMap.set(category.id, {
            ...category,
            children: [],
            products: products.filter(product => product.categoryId === category.id)
          });
        }
      }
    });
  
    // Convert the map to an array
    const result = Array.from(categoryMap.values());
  
    return result;
  }
  

//this code paginates final category children, not products
  paginateData(): void {
    const startIndex = this.currentPage * this.perPage;
    const endIndex = startIndex + this.perPage;
    this.paginatedCategories = this.categoriesWithProducts.slice(startIndex, endIndex);
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.perPage = event.pageSize;
    this.paginateData();
  }

  //function creates array of categories that contains array of child categories
  //so it is easier to print them in ngFor because there is no nesting in json file
  // filterForPrintCategories(data: IProductCategory[]): void {
  //   let dataToPrint: IProductCategoryPrint[] = [];
  //   let mainCategories = data.filter((x: IProductCategory) => x.parentId == null);
  //   mainCategories.forEach((element: any) => {
  //     let children = data.filter((x: IProductCategory) => x.parentId == element.id);
  //     element.children = children;
  //     dataToPrint.push(element);
  //   });
  //   this.categories = dataToPrint;
  // }
  //function creates array of categories that contains array of child categories that contains array of child products
  //so it is easier to print them in ngFor because there is no nesting in json file
  // filterForPrintCategoriesWithProducts(products: IProduct[], categories: IProductCategory[]) {
  //   let dataToPrint: any[] = [];
  //   let mainCategories = categories.filter((x: IProductCategory) => x.parentId == null);
  //   var subCategories: IProductCategory[] = [];
  //   mainCategories.forEach((element: any) => {
  //     let childCategories = categories.filter((x: IProductCategory) => x.parentId == element.id);
  //     subCategories = subCategories.concat(childCategories);
  //   });
  //   subCategories.forEach((element: any) => {
  //     let childCategories = categories.filter((x: IProductCategory) => x.parentId == element.id);
  //     element.childCategories = childCategories;
  //     element.childCategories.forEach((element: any) => {
  //       let childProducts = products.filter((x: any) => x.categoryId == element.id);
  //       element.childProducts = childProducts;
  //     });
  //     dataToPrint.push(element);
  //   });
  //   this.categoriesWithProducts = dataToPrint;
  //   this.totalItems = this.categoriesWithProducts.length;
  //   this.categoriesWithProductsToBeFiltered = dataToPrint;
  // }
  //function filters categories and their products to show just selected category
  filterData(id: string | number): void {
    console.log(id);
    let selectedCategory = this.categoriesWithProductsToBeFiltered.filter((x: any) => x.id == id);
    this.categoriesWithProducts=selectedCategory;
  //   let selectedCategory = this.categoriesWithProductsToBeFiltered.filter((x: any) => x.id == id);
  //   this.paginatedCategories = selectedCategory;
    //this code sets paginators properties so that final child categories can't be paginated because of recursion in html
    //it just shows to user like there is for example 3 item and 3 per page.Items and per page will always be the same
    //i will refactor this whole code when i implement back, because there is no recursion for categories in this version of code
  //   this.totalItems = selectedCategory[0].childCategories.length;
  //   this.perPage = selectedCategory[0].childCategories.length;
  //   this.currentPage = 0;
  }
}



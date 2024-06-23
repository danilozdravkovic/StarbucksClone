import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ProductCategoriesService } from 'src/app/menu/services/product-categories.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

 
  constructor(private productCategoriesService : ProductCategoriesService) {
    this.loadFlattProductCategories();
  }

  private flattProductCategoriesSubject = new BehaviorSubject<any[]>([]);
  flattProductCategories$ = this.flattProductCategoriesSubject.asObservable();

  private flattCategoriesWithNoChldrenSubject = new BehaviorSubject<any[]>([]);
  flattCategoriesWithNoChldrenSubject$ = this.flattCategoriesWithNoChldrenSubject.asObservable();

  private loadFlattProductCategories(): void {
    this.productCategoriesService.getAll().subscribe({
      next: (data) => {
        const flatCategories = this.flattenProductCategories(data.data);
        this.flattProductCategoriesSubject.next(flatCategories);

        const flattCategoriesWithNoChildren = this.filterFlattCategoriesWithNoChildren(data.data);
        this.flattCategoriesWithNoChldrenSubject.next(flattCategoriesWithNoChildren);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
 
  getFlattProductCategories(): Observable<any[]> {
    return this.flattProductCategories$;
  }

  getFlattCategoriesWithNoChildren(): Observable<any[]> {
    return this.flattCategoriesWithNoChldrenSubject$;
  }

  flattenProductCategories(categories:any):any[]{
    let flatList: any[] = [];
    categories.forEach((category:any) => {
      flatList.push({
        id: category.id,
        name: category.name,
        parentId:category.parentId
      });
  
      if (category.children) {
        flatList = flatList.concat(this.flattenProductCategories(category.children));
      }
    });
  
    return flatList;
  }

  filterFlattCategoriesWithNoChildren(categories: any[]): any[] {
    let categoriesWithNoChildren: any[] = [];
    categories.forEach((category: any) => {
      if (!category.children || category.children.length === 0) {
        categoriesWithNoChildren.push({
          id: category.id,
          name: category.name,
          parentId: category.parentId
        });
      }
      else{
        categoriesWithNoChildren = categoriesWithNoChildren.concat(this.filterFlattCategoriesWithNoChildren(category.children));
      }
    });
    return categoriesWithNoChildren;
  }

  subscribeToRefresh(): void {
    this.productCategoriesService.refreshNeeded.pipe(
      tap(() => {
        this.loadFlattProductCategories();
      })
    ).subscribe();
  }
}

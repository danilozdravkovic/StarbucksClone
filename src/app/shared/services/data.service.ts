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

  private loadFlattProductCategories(): void {
    this.productCategoriesService.getAll().subscribe({
      next: (data) => {
        const flatCategories = this.flattenProductCategories(data.data);
        this.flattProductCategoriesSubject.next(flatCategories);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
 
  getFlattProductCategories(): Observable<any[]> {
    return this.flattProductCategories$;
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

  subscribeToRefresh(): void {
    this.productCategoriesService.refreshNeeded.pipe(
      tap(() => {
        this.loadFlattProductCategories();
      })
    ).subscribe();
  }
}

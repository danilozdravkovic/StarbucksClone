import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavbarItem } from '../interfaces/navbar-item';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private http :HttpClient) { }

  getAll() : Observable<any>{
    return this.http.get("assets/jsons/navbar-items.json");
  }
}

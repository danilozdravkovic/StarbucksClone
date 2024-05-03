import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/shared/services/api.service';
import { apis } from 'src/app/constants/apis';

@Injectable({
  providedIn: 'root'
})
export class NavbarService extends ApiService {

  constructor(http :HttpClient) { 
    super(http,apis.navbarItems);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apis } from 'src/app/constants/apis';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class FooterLinksService extends ApiService {

  constructor(http :HttpClient) { 
    super(http,apis.jsons.footerLinks);
  }

  
}

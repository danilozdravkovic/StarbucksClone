import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { apis } from 'src/app/constants/apis';

@Injectable({
  providedIn: 'root'
})
export class FileService extends ApiService {

  constructor(http : HttpClient) {
    super(http,apis.server.files)
   }

  
}

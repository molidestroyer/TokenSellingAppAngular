import { OrderDetails } from './../models/order.details.interface';

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { WalletDetails } from './../models/wallet.details.interface';

import { ConfigService } from '../../shared/utils/config.service';

import {BaseService} from '../../shared/services/base.service';

import { Observable } from 'rxjs'; 
import { map, catchError } from 'rxjs/operators';
// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';

@Injectable()

export class DashboardService extends BaseService {

  baseUrl: string = ''; 

  constructor(private http: Http, private configService: ConfigService) {
     super();
     this.baseUrl = configService.getApiURI();
  }

  getWalletDetails(): Observable<WalletDetails> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

  return this.http.get(this.baseUrl + "/wallet/info",{headers})
    .pipe(map(response => response.json()),catchError(this.handleError));
  } 

}

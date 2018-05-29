import { OrderDetails } from './../../models/order.details.interface';
import { ConfigService } from './../../../shared/utils/config.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs'; 
import { map, catchError } from 'rxjs/operators';
// Add the RxJS Observable operators we need in this app.
import { BaseService } from '../../../shared/services/base.service';

@Injectable()

export class ExchangeService extends BaseService {

  baseUrl: string = ''; 

  constructor(private http: Http, private configService: ConfigService) {
     super();
     this.baseUrl = configService.getApiURI();
  }
  
  getOrders(): Observable<Array<OrderDetails>> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

  return this.http.get(this.baseUrl + "/exchange/orders",{headers})
    .pipe(map(response => response.json()),catchError(this.handleError));
  } 

  buyOrder(transactionId: string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

  return this.http.post(this.baseUrl + "/Exchange/Buy",JSON.stringify({ transactionId }),{headers})
    .pipe(map(response => response.json()),catchError(this.handleError));
  }

  createOrder(amount: number, price: number){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

  return this.http.post(this.baseUrl + "/Exchange/Sell",JSON.stringify({ amount, price }),{headers})
    .pipe(map(response => response.json()),catchError(this.handleError));
  }
}

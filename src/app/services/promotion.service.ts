import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of, Observable } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/new-baseurl';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError((errorResponse) => this.processHTTPMsgService.handleError(errorResponse)));
    //return of(PROMOTIONS).pipe(delay(2000));
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(PROMOTIONS), 2000)
    // });
  }

  getPromotion(id: string): Observable<Promotion>{
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
      .pipe(catchError((errorResponse) => this.processHTTPMsgService.handleError(errorResponse)));
    //return of(PROMOTIONS.filter((promotion) => (promotion.id == id))[0]).pipe(delay(2000));
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(PROMOTIONS.filter((promotion) => (promotion.id == id))[0]), 2000)
    // });
  }

  getFeaturedPromotion(): Observable<Promotion>{
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true')
      .pipe(map(promotions => promotions[0]))
      .pipe(catchError((errorResponse) => this.processHTTPMsgService.handleError(errorResponse)));
    //return of(PROMOTIONS.filter((promotion) => (promotion.featured))[0]).pipe(delay(2000));
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(PROMOTIONS.filter((promotion) => (promotion.featured))[0]), 2000)
    // });
  }

  // getFeaturedPromotion(): Promise<Promotion>{
  //   return of(PROMOTIONS.filter((promotion) => (promotion.featured))[0]).pipe(delay(2000)).toPromise();
  //   // return new Promise(resolve => {
  //   //   setTimeout(() => resolve(PROMOTIONS.filter((promotion) => (promotion.featured))[0]), 2000)
  //   // });
  // }
}

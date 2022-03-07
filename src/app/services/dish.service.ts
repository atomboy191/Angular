import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs';
import { catchError, delay,filter, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { baseURL } from '../shared/new-baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]>{
    return this.http.get<Dish[]>(baseURL +'dishes')
      .pipe(catchError((errorResponse) => this.processHTTPMsgService.handleError(errorResponse)));
    //return of(DISHES).pipe(delay(2000));
  }

  // getDishes(): Promise<Dish[]>{
  //   return of(DISHES).pipe(delay(2000)).toPromise();
  // }

  getDish(id: string): Observable<Dish>{
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError((errorResponse) => this.processHTTPMsgService.handleError(errorResponse)));
    //return of(DISHES.filter((dish) => (dish.id == id))[0]).pipe(delay(2000));
    //return new Promise(resolve => {
    //  setTimeout(() => resolve(), 2000)
    //}); 
  }

  // getDish(id: string): Promise<Dish>{
  //   return of(DISHES.filter((dish) => (dish.id == id))[0]).pipe(delay(2000)).toPromise();
  //   //return new Promise(resolve => {
  //   //  setTimeout(() => resolve(), 2000)
  //   //});
  // }

  getFeaturedDish(): Observable<Dish>{
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
      .pipe(map(dishes => dishes[0]))
      .pipe(catchError((errorResponse) => this.processHTTPMsgService.handleError(errorResponse)));

    //return of(DISHES.filter((dish) => (dish.featured))[0]).pipe(delay(2000));
    //return new Promise(resolve => {
    //  setTimeout(() => resolve(DISHES.filter((dish) => (dish.featured))[0]), 2000)
    //});
  }

  // getFeaturedDish(): Observable<Dish>{
  //   return of(DISHES.filter((dish) => (dish.featured))[0]).pipe(delay(2000)).toPromise();

  //   //return new Promise(resolve => {
  //   //  setTimeout(() => resolve(DISHES.filter((dish) => (dish.featured))[0]), 2000)
  //   //});
  // }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
    //return of(DISHES.map(dish => dish.id));
  }

  putDish(dish: Dish): Observable<Dish>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
    .pipe(catchError((errorResponse) => this.processHTTPMsgService.handleError(errorResponse)));
  }
}
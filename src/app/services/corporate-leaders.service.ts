import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/new-leaders';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/new-baseurl';

@Injectable({
  providedIn: 'root'
})
export class CorporateLeadersService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL + 'leadership')
      .pipe(catchError((errorResponse) => this.processHTTPMsgService.handleError(errorResponse)));
    //return of(LEADERS).pipe(delay(2000));
    //return new Promise(resolve => {
    //  setTimeout(() => resolve(LEADERS), 2000)
    //});
  }

  getFeaturedLeader(): Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership?featured=true')
      .pipe(map(leaders => leaders[0]))
      .pipe(catchError((errorResponse) => this.processHTTPMsgService.handleError(errorResponse)));
    //return of(LEADERS.filter(leader_item => leader_item.featured)[0]).pipe(delay(2000));
    //return new Promise(resolve => {
    //  setTimeout(() => resolve(LEADERS.filter(leader_item => leader_item.featured)[0]), 2000)
    //});
  }

  // getFeaturedLeader(): Promise<Leader>{
  //   return of(LEADERS.filter(leader_item => leader_item.featured)[0]).pipe(delay(2000)).toPromise();
  //   //return new Promise(resolve => {
  //   //  setTimeout(() => resolve(LEADERS.filter(leader_item => leader_item.featured)[0]), 2000)
  //   //});
  // }
}

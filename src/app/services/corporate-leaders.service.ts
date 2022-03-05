import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/new-leaders';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CorporateLeadersService {

  constructor() { }

  getLeaders(): Observable<Leader[]>{
    return of(LEADERS).pipe(delay(2000));
    //return new Promise(resolve => {
    //  setTimeout(() => resolve(LEADERS), 2000)
    //});
  }

  getFeaturedLeader(): Observable<Leader>{
    return of(LEADERS.filter(leader_item => leader_item.featured)[0]).pipe(delay(2000));
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

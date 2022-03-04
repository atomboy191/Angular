import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/new-leaders';

@Injectable({
  providedIn: 'root'
})
export class CorporateLeadersService {

  constructor() { }

  getLeaders(): Promise<Leader[]>{
    return Promise.resolve(LEADERS);
  }

  getFeaturedLeader(): Promise<Leader>{
    return Promise.resolve(LEADERS.filter(leader_item => leader_item.featured)[0]);
  }
}

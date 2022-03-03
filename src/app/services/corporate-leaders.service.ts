import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/new-leaders';

@Injectable({
  providedIn: 'root'
})
export class CorporateLeadersService {

  constructor() { }

  getLeaders(){
    return LEADERS;
  }

  getFeaturedLeader(): Leader{
    return LEADERS.filter(leader_item => leader_item.featured)[0];
  }
}

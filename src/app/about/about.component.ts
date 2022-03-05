import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { CorporateLeadersService } from '../services/corporate-leaders.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: Leader[];

  constructor(private corporateLeadersService: CorporateLeadersService) { }

  ngOnInit() {
    this.corporateLeadersService.getLeaders()
      .subscribe((leaders) => this.leaders = leaders);
  }

}

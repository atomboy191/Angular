import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { CorporateLeadersService } from '../services/corporate-leaders.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  errMsg: string

  constructor(private corporateLeadersService: CorporateLeadersService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.corporateLeadersService.getLeaders()
      .subscribe((leaders) => this.leaders = leaders,
      (errMsg) => {this.errMsg  = <any>errMsg; console.log("got error in about")});
  }

}

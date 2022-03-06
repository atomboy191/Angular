import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { Promotion } from '../shared/promotion'
import { Leader } from '../shared/leader';
import { CorporateLeadersService } from '../services/corporate-leaders.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMsg: string;
  promotionErrMsg: string;
  leaderErrMsg: string;

  constructor(private promotionService: PromotionService,
    private dishService: DishService,
    private leaderService: CorporateLeadersService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getFeaturedDish()
      .subscribe((dish) => this.dish = dish, 
      (errMsg) => {this.dishErrMsg  = <any>errMsg; console.log("got error in Home:featuredDish")})
    this.promotionService.getFeaturedPromotion()
      .subscribe((promotion) => this.promotion = promotion, 
      (errMsg) => {this.promotionErrMsg  = <any>errMsg; console.log("got error in Menu:Promotion")});
    this.leaderService.getFeaturedLeader()
      .subscribe((leader) => this.leader = leader, 
      (errMsg) => {this.leaderErrMsg  = <any>errMsg; console.log("got error in Menu:Leader")});
  }

  // ngOnInit() {
  //   this.dishService.getFeaturedDish()
  //     .then((dish) => this.dish = dish)
  //   this.promotionService.getFeaturedPromotion()
  //     .then((promotion) => this.promotion = promotion);
  //   this.leaderService.getFeaturedLeader()
  //     .then((leader) => this.leader = leader);
  // }

}

import { Component, OnInit } from '@angular/core';
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

  constructor(private promotionService: PromotionService,
    private dishService: DishService,
    private leaderService: CorporateLeadersService) { }

  ngOnInit() {
    this.dishService.getFeaturedDish()
      .subscribe((dish) => this.dish = dish)
    this.promotionService.getFeaturedPromotion()
      .subscribe((promotion) => this.promotion = promotion);
    this.leaderService.getFeaturedLeader()
      .subscribe((leader) => this.leader = leader);
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

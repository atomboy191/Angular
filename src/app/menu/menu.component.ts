import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish'
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes : Dish[];
  errMsg: String;

  selectedDish: Dish;

  constructor(private dishService: DishService,
    @Inject('BaseURL') private BaseURL) {}

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe((dishes) => this.dishes = dishes, 
        (errMsg) => {this.errMsg  = <any>errMsg; console.log("got error in Menu")});
  }

  // ngOnInit() {
  //   this.dishService.getDishes()
  //     .then((dishes) => this.dishes = dishes);
  // }

}

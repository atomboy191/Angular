import { Component, Input, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  //@Input()
  dish : Dish;
  dishIds : string[];
  prev: string;
  next: string;

  constructor(private dishService: DishService, 
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.dishService.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe((dish) => {this.dish = dish; this.setPrevNext(this.dish.id)});
    //  let id = this.route.snapshot.params['id'];
    //this.dishService.getDish(id)
    //  .subscribe((dish) => this.dish = dish);
  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    console.log('setPrevNext next',dishId,index,this.dishIds,this.prev,this.next,(this.dishIds.length + index + 1)/this.dishIds.length);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
    console.log('setPrevNext',this.prev,this.next);
  }


  goBack(): void {    
    this.location.back();
  }
}

import { Component, Input, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { Comment } from '../shared/comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  comment: Comment;
  commentForm: FormGroup;
  errMsg: string;
  dishCopy: Dish;
  @ViewChild('cform') commentFormDirective;

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Name is required',
      'minlength': 'First name must be at least 2 chracters long',
      'maxlength': 'First name cannot be more than 25 chacters'
    },
    'comment': {
      'required': 'Comment is required',
    },
  };

  formCurrent = {
    'author': '',
    'rating': 0,
    'comment': ''
  }

  constructor(private dishService: DishService, 
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 5,
      comment: ['', [Validators.required]]
      }
    )

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChange(data));

    this.onValueChange(); //(re)set form validation messages
  }

  onValueChange(data?){
    if(!this.commentForm) {return;}
    const form = this.commentForm;
    this.formCurrent = form.value;
    
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)) {
        //clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  ngOnInit() {
    this.dishService.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds,
        (errMsg) => {this.errMsg  = <any>errMsg; console.log("got error in Detail:dishIds")});
      
    this.route.params
      .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe((dish) => {this.dish = dish; this.dishCopy = dish; this.setPrevNext(this.dish.id)},
      (errMsg) => {this.errMsg  = <any>errMsg; console.log("got error in Detail")});
    //  let id = this.route.snapshot.params['id'];
    //this.dishService.getDish(id)
    //  .subscribe((dish) => this.dish = dish);
  }

  setPrevNext(dishId: string){
    if(this.dishIds){
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
    }
  }

  goBack(): void {    
    this.location.back();
  }

  onSubmit(){
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dishCopy.comments.push(this.comment);
    this.dishService.putDish(this.dishCopy)
      .subscribe((dish) => {this.dishCopy = dish; this.dish = dish},
      (errMsg) => {this.dish = null; this.dishCopy = null; this.errMsg  = <any>errMsg; console.log("got error in Put")});
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: '',
    });
    
    
  }
}

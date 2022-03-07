import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  errMsg: string;
  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'firstName': '',
    'lastName': '',
    'telNum': '',
    'email': ''
  };

  validationMessages = {
    'firstName': {
      'required': 'First name is required',
      'minlength': 'First name must be at least 2 chracters long',
      'maxlength': 'First name cannot be more than 25 chacters'
    },
    'lastName': {
      'required': 'Last name is required',
      'minlength': 'Last name must be at least 2 chracters long',
      'maxlength': 'Last name cannot be more than 25 chacters'
    },
    'telNum': {
      'required': 'Telephone number is required',
      'pattern': 'Telephone number can contain only numbers [0-9]'
    },
    'email': {
      'required': 'Email is required',
      'email': 'Email is not valid'
    },
  };

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telNum: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contactType: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChange(data));

    this.onValueChange(); //(re)set form validation messages
  }

  onValueChange(data?) {
    if(!this.feedbackForm) {return;}
    const form = this.feedbackForm;
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

  onSubmit(){
    this.feedback = this.feedbackForm.value;
    this.feedbackService.putFeedback(this.feedback)
      .subscribe((feedback) => {console.log('posted',feedback)},
      (errMsg) => {this.errMsg  = <any>errMsg; console.log("got error in putFeedback")});
    this.feedbackFormDirective.resetForm();
    this.feedbackForm.reset({
      firstName: '',
      lastName: '',
      telNum: '',
      email: '',
      agree: false,
      contactType: 'None',
      message: ''
    });
    
  }

}

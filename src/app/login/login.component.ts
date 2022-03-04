import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material'; 
import { User } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(public dialogRef: MatDialogRef<LoginComponent>) {
    this.user = new User();
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('User: ', this.user);
    this.dialogRef.close();

  }

}

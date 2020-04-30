/*
* Component for reset password
 */
import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.createForm();
  }
  private Submitted = false;
  private Reset = false; // for show page of reset password
  private Email: string; // email for reset
  contactForm: FormGroup;


  get email(): string {
    return this.Email;
  }

  set email(value: string) {
    this.Email = value;
  }
  get reset(): boolean {
    return this.Reset;
  }

  set reset(value: boolean) {
    this.Reset = value;
  }
  get submitted(): boolean {
    return this.Submitted;
  }

  set submitted(value: boolean) {
    this.Submitted = value;
  }

  ngOnInit(): void {
  }

  /*
  * Back in login page
   */
  back() {
    this.router.navigateByUrl('/Login');
    this.Reset = false;
  }

  /*
  * It calls function ResetPassword of the service and updates status
  */
  resetPassword() {
    this.authenticationService.resetPassword(this.Email);
    this.Reset = true;
  }

  createForm() {
    this.contactForm = new FormGroup({
      email: new FormControl(this.Email, [
        Validators.required,
        Validators.email
      ]),
    });
  }

  onSubmit(): void {
    this.Submitted = true;
  }
}

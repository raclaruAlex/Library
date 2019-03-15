import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    //private authenticationService: AuthenticationService,
    //private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });

    // reset login status
    //this.authenticationService.logout();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // this.loading = true;
    // this.authenticationService.login(this.f.username.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //     });

    this.router.navigate(['/dashboard']);
  }

}

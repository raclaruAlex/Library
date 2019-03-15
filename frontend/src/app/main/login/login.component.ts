import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/service/authetication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  lForm: FormGroup;
  error: string;
  subscriptions: Subscription[];
  redirectUrl: string = undefined;
  formSubmitted = false;

  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private authenticationService: AuthService) {
    this.lForm = fb.group({
      'username': [null,Validators.required],
      'password': [null,Validators.required],
    });
  }

  ngOnInit() {
    this.subscriptions = [];
    this.authenticationService.logout();
    this.subscriptions.push(this.route.queryParams.subscribe(params => {
      this.redirectUrl = params['returnUrl'];
    }));
  }

  login() {
    this.formSubmitted = true;

    if(this.lForm.invalid)
    {
        return;
    }

    this.formSubmitted = false;

    this.subscriptions.push(this.authenticationService.login(this.lForm.get('username').value, this.lForm.get('password').value)
      .subscribe(
        data => {
          const bearerToken = data.headers.get('Authorization');
          if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
            const jwt = bearerToken.slice(7, bearerToken.length);
            localStorage.setItem('authenticationToken', JSON.stringify(jwt));
          }
          if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error => {
          this.error = error;
        }));
  }


  logout() {
    this.subscriptions.push(this.authenticationService.logout().subscribe());
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}

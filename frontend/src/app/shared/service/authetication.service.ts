import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs/internal/Observable';


@Injectable()
export class AuthService implements OnInit {

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>('/api/authenticate', {
            username: username,
            password: password
        }, {observe: 'response'});
    }

    public isAuthenticated() {
        const token = JSON.parse(localStorage.getItem('authenticationToken'));
        const jwtHelper = new JwtHelperService();

        // Check whether the token is expired and return
        // true or false
        if (!jwtHelper.isTokenExpired(token)) {
            return true;
        }

        localStorage.removeItem('authenticationToken');
        return false;

    }

    logout(): Observable<any> {
        // remove user from local storage to log user out
        return new Observable((observer) => {
            localStorage.removeItem('authenticationToken');
            observer.complete();
        });
    }

    getUserName(): string {
        const token = localStorage.getItem('authenticationToken');
        if (!token) {
            return '';
        }
        const jwtHelper = new JwtHelperService();
        // decode the token to get its payload
        const tokenPayload = jwtHelper.decodeToken(token);

        if (this.isAuthenticated()) {
            return tokenPayload.sub;
        }
        return '';
    }

}

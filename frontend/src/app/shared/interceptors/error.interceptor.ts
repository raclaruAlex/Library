import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../service/authetication.service';
import {Router} from '@angular/router';
import {SuccessOrErrorHandlerService} from '../service/success-or-error-handler.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authService: AuthService, private errorHandlerService: SuccessOrErrorHandlerService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.log('Error from interceptor', error);
                    if (error.status === 401) {
                        if (this.router.url === '/login') {
                            this.authService.logout();
                            this.router.navigateByUrl('/', {preserveQueryParams: true});
                            return throwError(this.getErrorMessage(error));
                        }
                        localStorage.removeItem('authenticationToken');
                        this.router.navigateByUrl('/', {preserveQueryParams: true});
                        return throwError(error.message);
                    }
                    let errMsg = '';
                    if (error.status === 404) {
                        errMsg = 'No such method on the server';
                    } else if (error.status === 405) {
                        errMsg = 'Http method not allowed !!! (GET,POST,DELETE,UPDATE...)';
                    } else if (error.error instanceof ErrorEvent) {  // Client Side Error
                        errMsg = 'Client error' + error.error.message;
                    } else {  // Server Side Error
                        errMsg = this.getErrorMessage(error); // `Server error Code: ${error.status},  Message: ${error.message}`;
                    }
                    this.errorHandlerService.showError(errMsg);
                    return throwError(errMsg);
                })
            );
    }

    getErrorMessage(error: HttpErrorResponse): string {
        let errMsg = '';
        if (error.headers.get('X-app-alert') && error.headers.get('X-app-alert').length > 0) {

            errMsg = error.headers.get('X-app-alert');
        } else {
            errMsg = 'Erroare interna, apelati administratorul';
            // errMsg = 'Error message: ' + error.message!!! + '\n Error error: ' + error.error.error;
        }
        return errMsg;
    }

}

import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SuccessOrErrorHandlerService implements OnInit, OnDestroy {
    public error: BehaviorSubject<string>;
    public success: BehaviorSubject<string>;

    constructor() {
        this.error = new BehaviorSubject<string>('');
        this.success = new BehaviorSubject<string>('');

    }

    showError(errorMessage: string) {
        this.error.next(errorMessage);
    }

    showSuccess(successMessage: string) {
        this.success.next(successMessage);
    }

    cleanMessage() {
        this.error.next('');
        this.success.next('');
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
    }


}

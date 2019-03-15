import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'angular-bootstrap-md';
import {Subscription} from 'rxjs';
import {SuccessOrErrorHandlerService} from '../../shared/service/success-or-error-handler.service';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {

  @ViewChild('errorModal') modalDialog: ModalDirective;
  public error: string;
  public success: string;
  public modalType = false;

  errorObs: Subscription;
  successObs: Subscription;

  constructor(private errorHandlerService: SuccessOrErrorHandlerService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

    this.errorObs = this.errorHandlerService.error.asObservable().subscribe(async value => {
      if (await value && value.length > 0) {
        this.error = value;
        this.modalType = false;
        this.modalDialog.show();
      }
    }, error1 => {
      console.log('SuccessOrErrorResponseHandlerComponent error on show error', error1)
    });

    this.successObs = this.errorHandlerService.success.asObservable().subscribe(async value => {
        if (await value && value.length > 0) {
          console.log(value);
          this.success = value;
          this.modalType = true;
          this.modalDialog.show();
        }
      }, error1 => {
        console.log('SuccessOrErrorResponseHandlerComponent error on show succes', error1)
      }
    );
  }

  closeErrorModal() {
    this.error = '';
    this.success = '';
    this.modalDialog.hide();
    this.errorHandlerService.cleanMessage();
  }

  ngOnDestroy() {
    this.errorObs.unsubscribe();
    this.successObs.unsubscribe();
  }

}

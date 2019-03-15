import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MaterialSharedModule} from './material-shared.module';
import {registerLocaleData} from '@angular/common';
import localeRo from '@angular/common/locales/ro-MD';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServerUrlInterceptor} from './shared/interceptors/server-url.interceptor';
import {AppRoutingModule} from './app-routing.module';
import {RentBookComponent} from './main/rent-book/rent-book.component';
import {ReturnBookComponent} from './main/return-book/return-book.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NewMemberDialogComponent} from './dialog/new-member-dialog/new-member-dialog.component';
import {NewBookDialogComponent} from './dialog/new-book-dialog/new-book-dialog.component';
import {BookHistoryDialogComponent} from './dialog/book-history-dialog/book-history-dialog.component';
import {MemberListDialogComponent} from './dialog/member-list-dialog/member-list-dialog.component';
import {MessageDialogComponent} from './dialog/message-dialog/message-dialog.component';
import {SuccessOrErrorHandlerService} from './shared/service/success-or-error-handler.service';
import {LoginComponent} from './main/login/login.component';
import {AuthService} from './shared/service/authetication.service';
import {ErrorInterceptor} from './shared/interceptors/error.interceptor';

registerLocaleData(localeRo, 'ro-MD');

const interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ServerUrlInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RentBookComponent,
    ReturnBookComponent,
    NewMemberDialogComponent,
    NewBookDialogComponent,
    BookHistoryDialogComponent,
    MemberListDialogComponent,
    MessageDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialSharedModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,SuccessOrErrorHandlerService,interceptors,{provide: LOCALE_ID, useValue: 'ro-MD'}],
  bootstrap: [AppComponent],
  entryComponents: [NewMemberDialogComponent,NewBookDialogComponent,BookHistoryDialogComponent,MemberListDialogComponent]
})
export class AppModule {
}

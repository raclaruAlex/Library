import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HistoryService} from '../../shared/service/history.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {BookService} from '../../shared/service/book.service';
import {SuccessOrErrorHandlerService} from '../../shared/service/success-or-error-handler.service';


@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.css']
})
export class ReturnBookComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  rbForm: FormGroup;
  membForm: FormGroup;
  formSubmitted: boolean;
  members: any[] = [];
  history: any[] = [];

  constructor(private fb: FormBuilder,
              private historyService: HistoryService,
              private bookService: BookService,
              private errorHandlerService: SuccessOrErrorHandlerService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.rbForm = fb.group({
      'id': [null],
      'title': [null],
      'author': [null],
      'publisher': [null],
      'publicationYear': [null],
      'category':
        fb.group({
          'id': [null],
          'description': [null],
        }),
      'quantity':
        fb.group({
          'id': [null],
          'totalQuantity': [null],
          'rentalQuantity': [null],
        }),
    });
    this.membForm = fb.group({
      'member': [null]
    });

    this.membForm.get('member').valueChanges.subscribe(val => {
      this.history = [];
      if (val && val.id) {
        this.subscriptions.push(
          this.historyService.getHistoryForMember(val.id).subscribe(data => {
              this.history = data;
            },
            error => console.log(error)
          )
        );
      }
    });
  }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
      this.subscriptions.push(
        this.historyService.getHistoryForBook(params['id']).subscribe(data => {
            this.rbForm.setValue(data[0].book);
            this.members = [];
            data.forEach(s =>    this.members = [...this.members, s.member]);
          },
          error => console.log(error)
        )
      );
    }));
  }

  back() {
    this.router.navigate(['dashboard/']);
  }

  return() {
    this.formSubmitted = true;

    if (!this.membForm.get('member').value || !this.membForm.get('member').value.id) {
      return;
    }

    this.formSubmitted = false;

    this.subscriptions.push(
      this.bookService.returnBook(this.rbForm.value, this.membForm.get('member').value).subscribe(data => {
          this.errorHandlerService.showSuccess('Cartea a fost returnata');
          this.router.navigate(['dashboard/']);
        },
        error => console.log(error)
      )
    );
  }


}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable, Subject, Subscription} from 'rxjs';
import {BookService} from '../../shared/service/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, filter, flatMap, tap} from 'rxjs/operators';
import {MemberService} from '../../shared/service/member.service';
import {HistoryService} from '../../shared/service/history.service';
import {NewMemberDialogComponent} from '../../dialog/new-member-dialog/new-member-dialog.component';
import {MatDialog} from '@angular/material';
import {SuccessOrErrorHandlerService} from '../../shared/service/success-or-error-handler.service';

@Component({
  selector: 'app-rent-book',
  templateUrl: './rent-book.component.html',
  styleUrls: ['./rent-book.component.css']
})
export class RentBookComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  rbForm: FormGroup;
  membForm: FormGroup;
  formSubmitted: boolean;
  members: Observable<any[]>;
  memberInput = new Subject<string>();
  mmemberLoading = false;
  history: any[];
  bookAlreadyRented = false;

  constructor(private fb: FormBuilder,
              private bookService: BookService,
              private memberService: MemberService,
              private historyService: HistoryService,
              private errorHandlerService: SuccessOrErrorHandlerService,
              public dialog: MatDialog,
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
      this.bookAlreadyRented = false;
      this.history = [];
      if (val && val.id) {
        this.subscriptions.push(
          this.historyService.getHistoryForMember(val.id).subscribe(data => {
              this.history = data;
              if (this.history.find(t => t.book.id == this.rbForm.get('id').value && !t.returnDate)) {
                this.bookAlreadyRented = true;
              }
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
        this.bookService.getBookDetailsById(params['id']).subscribe(data => {
            this.rbForm.setValue(data);
          },
          error => console.log(error)
        )
      );
    }));

    this.members =
      this.memberInput.pipe(
        filter((result: string) => {
          if (result && result.length > 3) {
            return true;
          }
        }),
        debounceTime(400),
        distinctUntilChanged(),
        tap((val: string) => {
          this.mmemberLoading = true;

        }),
        flatMap(term =>

          this.memberService.getMemberDetailsByLastname(term).pipe(
            tap(() => this.mmemberLoading = false)
          )
        )
      );
  }

  newMember() {
    const dialogRef2 = this.dialog.open(NewMemberDialogComponent, {
      width: '400px',
      data: {},
      hasBackdrop: true
    });

    dialogRef2.afterClosed().subscribe(result => {
      if (result && result.response) {
        this.subscriptions.push(
          this.memberService.addMember(result).subscribe(data => {
              this.membForm.reset();
              this.history = [];
              this.bookAlreadyRented = false;
              this.membForm.setValue({member: data.body});
            },
            error => console.log(error)
          )
        );
      }
    });
  }

  back() {
    this.router.navigate(['dashboard/']);
  }

  rent() {
    this.formSubmitted = true;

    if (!this.membForm.get('member').value || !this.membForm.get('member').value.id) {
      return;
    }

    this.formSubmitted = false;

    if (this.bookAlreadyRented) {
      return;
    }

    this.subscriptions.push(
      this.bookService.rentBook(this.rbForm.value, this.membForm.get('member').value).subscribe(data => {
          this.errorHandlerService.showSuccess('Cartea a fost inchiriata');
          this.router.navigate(['dashboard/']);
        },
        error => console.log(error)
      )
    );
  }

}

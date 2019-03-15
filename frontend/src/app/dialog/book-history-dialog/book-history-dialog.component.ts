import {Component, Inject, OnInit} from '@angular/core';
import {HistoryService} from '../../shared/service/history.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-book-history-dialog',
  templateUrl: './book-history-dialog.component.html',
  styleUrls: ['./book-history-dialog.component.css']
})
export class BookHistoryDialogComponent implements OnInit {

  history : any[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private historyService : HistoryService,
              public dialogRef: MatDialogRef<BookHistoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dataDialog: any,) { }

  ngOnInit() {
    this.subscriptions.push(
      this.historyService.getHistoryForBook(this.dataDialog.bookId).subscribe(data => {
          this.history = data;
        },
        error => console.log(error)
      )
    );

  }

}

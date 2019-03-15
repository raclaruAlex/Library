import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Subscription} from 'rxjs';
import {AdministrationService} from '../../shared/service/administration.service';

@Component({
  selector: 'app-new-book-dialog',
  templateUrl: './new-book-dialog.component.html',
  styleUrls: ['./new-book-dialog.component.css']
})
export class NewBookDialogComponent implements OnInit {

  mForm: FormGroup;
  formSubmitted: boolean;
  categories: any[] = [];
  private subscriptions: Subscription[] = [];
  titlePage = 'Adaugare carte'

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<NewBookDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dataDialog: any,
              private adminstrationService: AdministrationService) {
    this.mForm = fb.group({
      'id' : [null],
      'title': [null, Validators.required],
      'author': [null, Validators.required],
      'category': [null, Validators.required],
      'publisher': [null, Validators.required],
      'publicationYear': [2019, [Validators.required, Validators.min(1900), Validators.max(2019)]],
      'quantity':
        fb.group({
          'id' : [null],
          'totalQuantity': [1, [Validators.required, Validators.min(1)]],
          'rentalQuantity': [0]
        }),
      'response': [null]
    });
  }

  ngOnInit() {
    if( this.dataDialog && this.dataDialog.book)
    {
      this.titlePage = 'Editare carte';
    }

    this.subscriptions.push(
      this.adminstrationService.getBookCategories().subscribe(data => {
          this.categories = data;
          if (this.dataDialog && this.dataDialog.book) {
            this.mForm.setValue(this.dataDialog.book);
          }
        },
        error => console.log(error)
      )
    );
  }

  add() {
    this.formSubmitted = true;

    if (this.mForm.invalid || this.mForm.get('quantity.totalQuantity').value<this.mForm.get('quantity.rentalQuantity').value) {
      return;
    }

    this.formSubmitted = false;

    this.mForm.get('response').setValue(true);
    this.dialogRef.close(this.mForm.value);
  }

  cancel() {
    this.mForm.get('response').setValue(false);
    this.dialogRef.close(this.mForm.value);
  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-member-dialog',
  templateUrl: './new-member-dialog.component.html',
  styleUrls: ['./new-member-dialog.component.css']
})
export class NewMemberDialogComponent implements OnInit {

  mForm: FormGroup;
  formSubmitted: boolean;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public dataDialog: any,
              public dialogRef: MatDialogRef<NewMemberDialogComponent>) {
    this.mForm = fb.group({
      'id' : [null],
      'lastname': [null, Validators.required],
      'firstname': [null, Validators.required],
      'address': [null, Validators.required],
      'phoneNumber': [null, Validators.required],
      'email': [null, [Validators.email, Validators.required]],
      'response': [null]
    });
  }

  ngOnInit() {
    if (this.dataDialog && this.dataDialog.member) {
      this.mForm.setValue(this.dataDialog.member);
    }
  }

  add() {
    this.formSubmitted = true;

    if (this.mForm.invalid) {
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

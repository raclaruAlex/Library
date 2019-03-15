import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MemberService} from '../../shared/service/member.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {NewMemberDialogComponent} from '../new-member-dialog/new-member-dialog.component';

@Component({
  selector: 'app-member-list-dialog',
  templateUrl: './member-list-dialog.component.html',
  styleUrls: ['./member-list-dialog.component.css']
})
export class MemberListDialogComponent implements OnInit {

  members : any[] = [];
  private subscriptions: Subscription[] = [];

  constructor(public dialogRef: MatDialogRef<MemberListDialogComponent>,
              private memberService : MemberService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public dataDialog: any) { }

  ngOnInit() {
    this.members = this.dataDialog;
  }

  addMember()
  {
    const dialogRef2 = this.dialog.open(NewMemberDialogComponent, {
      width: '400px',
      data: {},
      hasBackdrop: true
    });

    dialogRef2.afterClosed().subscribe(result => {
      if (result && result.response) {
        this.subscriptions.push(
          this.memberService.addMember(result).subscribe(data => {
                this.members.push(data.body);
            },
            error => console.log(error)
          )
        );
      }
    });
  }

  editMember(member,i)
  {
    member.response = false;
    const dialogRef2 = this.dialog.open(NewMemberDialogComponent, {
      width: '400px',
      data: {member : member},
      hasBackdrop: true
    });

    dialogRef2.afterClosed().subscribe(result => {
      if (result && result.response) {
        this.subscriptions.push(
          this.memberService.addMember(result).subscribe(data => {
                this.members[i] = data.body;
            },
            error => console.log(error)
          )
        );
      }
    });
  }

}

import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {BookService} from '../../shared/service/book.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {NewMemberDialogComponent} from '../../dialog/new-member-dialog/new-member-dialog.component';
import {NewBookDialogComponent} from '../../dialog/new-book-dialog/new-book-dialog.component';
import {BookHistoryDialogComponent} from '../../dialog/book-history-dialog/book-history-dialog.component';
import {AdministrationService} from '../../shared/service/administration.service';
import {MemberListDialogComponent} from '../../dialog/member-list-dialog/member-list-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  totalQuantity: number = 0;
  rentalQuantity: number = 0;
  members : any[] = [];
  private subscriptions: Subscription[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: any[] = ['number', 'title', 'author', 'publisher', 'publicationYear', 'category', 'available', 'rented', 'actions'];
  dataSource = new MatTableDataSource<any>();
  visibility = false;

  constructor(private bookService: BookService,
              private administrationService: AdministrationService,
              public dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.loadBooksDetails();
  }

  loadBooksDetails()
  {
    this.subscriptions.push(
      this.bookService.getAllBooks().subscribe(data => {
          this.dataSource.data = data;
        },
        error => console.log(error)
      )
    );

    this.subscriptions.push(
      this.bookService.getBooksTotalQuantity().subscribe(data => {
          this.totalQuantity = data;
        },
        error => console.log(error)
      )
    );

    this.subscriptions.push(
      this.bookService.getBooksRentalQuantity().subscribe(data => {
          this.rentalQuantity = data;
        },
        error => console.log(error)
      )
    );

    this.subscriptions.push(
      this.administrationService.getAllMembers().subscribe(data => {
          this.members = data;
        },
        error => console.log(error)
      )
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Carti pe pagina: ';
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  changeVisibility() {
    this.visibility = !this.visibility;
  }

  editBook(book)
  {
    book.response = false;
    const dialogRef2 = this.dialog.open(NewBookDialogComponent, {
      width: '400px',
      data: {book : book},
      hasBackdrop: true
    });

    dialogRef2.afterClosed().subscribe(result => {
      if (result && result.response) {
        this.subscriptions.push(
          this.bookService.addBook(result).subscribe(data => {
              this.loadBooksDetails();
            },
            error => console.log(error)
          )
        );
      }
    });
  }

  rent(id) {
    this.router.navigate(['rent/' + id]);
  }

  return(id) {
    this.router.navigate(['return/' + id]);
  }

  addBooks()
  {
    const dialogRef2 = this.dialog.open(NewBookDialogComponent, {
      width: '400px',
      data: {},
      hasBackdrop: true
    });

    dialogRef2.afterClosed().subscribe(result => {
      if (result && result.response) {
        this.subscriptions.push(
          this.bookService.addBook(result).subscribe(data => {
                this.loadBooksDetails();
            },
            error => console.log(error)
          )
        );
      }
    });
  }

  showRentBooksDetails(book)
  {
    const dialogRef2 = this.dialog.open(BookHistoryDialogComponent, {
      width: '900px',
      data: {bookId : book.id},
      hasBackdrop: true
    });

    dialogRef2.afterClosed().subscribe(result => {
      if (result && result.response) {

      }
    });
  }

  showMembers(bookId)
  {
    const dialogRef2 = this.dialog.open(MemberListDialogComponent, {
      width: '900px',
      data: this.members,
      hasBackdrop: true
    });

    dialogRef2.afterClosed().subscribe(result => {
      if (result && result.response) {

      }
    });
  }

}

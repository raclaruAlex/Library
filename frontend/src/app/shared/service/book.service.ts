import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class BookService {

  constructor(private http: HttpClient) {
  }

  getBooksTotalQuantity(): Observable<any> {
    return this.http.get('/api/books/get-books-total-quantity');
  }

  getBooksRentalQuantity(): Observable<any> {
    return this.http.get('/api/books/get-books-rental-quantity');
  }

  getAllBooks(): Observable<any> {
    return this.http.get('/api/books/get-all-books', {params: {}, responseType: 'json'});
  }

  getBookDetailsById(id): Observable<any> {
    return this.http.get('/api/books/get-book-by-id', {params: {id : id}, responseType: 'json'});
  }

  rentBook(book,member)
  {
    return this.http.post<any>('/api/books/rent',{book : book, member : member} , {observe: 'response'});
  }

  returnBook(book,member)
  {
    return this.http.post<any>('/api/books/return',{book : book, member : member} , {observe: 'response'});
  }

  addBook(book)
  {
    return this.http.post<any>('/api/books/add-book', book, {observe: 'response'});
  }
}

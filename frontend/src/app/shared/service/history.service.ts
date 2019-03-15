import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class HistoryService {

  constructor(private http: HttpClient) {
  }

  getHistoryForMember(memberId): Observable<any> {
    return this.http.get('/api/history/get-history-for-member', {params: {memberId : memberId}, responseType: 'json'});
  }

  getHistoryForBook(bookId): Observable<any> {
    return this.http.get('/api/history/get-history-for-book', {params: {bookId : bookId}, responseType: 'json'});
  }
}

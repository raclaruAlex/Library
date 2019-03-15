import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AdministrationService {

  constructor(private http: HttpClient) {
  }

  getBookCategories(): Observable<any> {
    return this.http.get('/api/administration/all-categories');
  }

  getAllMembers(): Observable<any> {
    return this.http.get('/api/administration/all-members');
  }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class MemberService {

  constructor(private http: HttpClient) {
  }

  getMemberDetailsByLastname(lastname): Observable<any> {
    return this.http.get('/api/members/get-member-details-by-lastname', {params: {lastname : lastname}, responseType: 'json'});
  }

  addMember(member)
  {
    return this.http.post<any>('/api/members/add-member', member, {observe: 'response'});
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
const httpOptions = {
  headers: new HttpHeaders(
    { 'Content Type': 'application/json' }),
  withCredentials: true,

};
@Injectable()
export class HomeService {

  constructor(public http: HttpClient) {

  }
  getMyTimeline(): Observable<any> {
    return this.http.get(`${environment.baseUrl}timeline`);
  }
  postTweet(body): Observable<any> {
    return this.http.post(`${environment.baseUrl}tweet`,  body);
  }
  getUserDetails(userId): Observable<any> {
    return this.http.get(`${environment.baseUrl}/users/${userId}/tweets`);
  }
  getUserFollowerList(userId): Observable<any> {
    return this.http.get(`${environment.baseUrl}/users/${userId}/followers`);
  }
  getUserFollowingList(userId): Observable<any> {
    return this.http.get(`${environment.baseUrl}/users/${userId}/following`);
  }

  getAllUserList(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/users`);
  }

  requestFollow(body): Observable<any> {
    return this.http.post(`${environment.baseUrl}follow`,  body);
  }
  requestUnFollow(body): Observable<any> {
    return this.http.post(`${environment.baseUrl}unfollow`,  body);
  }
  requestSearch(body): Observable<any> {
    return this.http.post(`${environment.baseUrl}search`,  body);
  }
}

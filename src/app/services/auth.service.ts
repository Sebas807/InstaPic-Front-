import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();
  private pendingFollowersSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public pendingFollowers$: Observable<any[]> = this.pendingFollowersSubject.asObservable();
  private approvedFollowersSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public approvedFollowers$: Observable<any[]> = this.approvedFollowersSubject.asObservable();
  private userFirstPhotoSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public userFirstPhoto$: Observable<any> = this.userFirstPhotoSubject.asObservable();
  private userPostCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public userPostCount$: Observable<number> = this.userPostCountSubject.asObservable();

  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  register(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  login(data: any): Observable<any> {
    return this.http.post<{ token: string, user: any }>(`${this.baseUrl}/login`, data).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.userSubject.next(response.user);
        this.isAuthenticatedSubject.next(true);
        this.fetchPendingFollowers(response.user.id);
        this.fetchApprovedFollowers(response.user.id);
        this.fetchUserFirstPhoto(response.user.id);
        this.fetchUserPostCount(response.user.id);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.pendingFollowersSubject.next([]);
    this.approvedFollowersSubject.next([]);
    this.userFirstPhotoSubject.next(null);
    this.userPostCountSubject.next(0);
  }

  fetchPendingFollowers(userId: number): void {
    this.http.get<any[]>(`${this.baseUrl}/followers/pending/${userId}`).subscribe(followers => {
      this.pendingFollowersSubject.next(followers);
    });
  }

  fetchApprovedFollowers(userId: number): void {
    this.http.get<any[]>(`${this.baseUrl}/followers/approved/${userId}`).subscribe(followers => {
      this.approvedFollowersSubject.next(followers);
    });
  }

  fetchUserFirstPhoto(userId: number): void {
    this.http.get<any>(`${this.baseUrl}/posts/first-photo/${userId}`).subscribe(photo => {
      this.userFirstPhotoSubject.next(photo);
    });
  }

  fetchUserPostCount(userId: number): void {
    this.http.get<number>(`${this.baseUrl}/posts/count/${userId}`).subscribe(count => {
      this.userPostCountSubject.next(count);
    });
  }

  searchByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${name}`);
  }

}




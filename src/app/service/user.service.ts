import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { user } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<user>(this.getUserLocalStorage())
  public userObservable: Observable<user>

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService
  ) {
    this.userObservable = this.userSubject.asObservable()
   }

   login(userLogin: IUserLogin): Observable<user>{
      return this.http.post<user>(USER_LOGIN_URL, userLogin)
        .pipe(tap({
          next: (user) => {
            this.setUserLocalStorage(user)
            this.userSubject.next(user)
            this.toastrService.success(
              `Welcome to Foodmine ${user.name}`,
              'Login Successful'
            )
          },
          error: (errorResponse) => {
            this.toastrService.error(errorResponse.error, 'Login Failed')
          }
        }))
   }

   logout(){
    this.userSubject.next(new user())
    localStorage.removeItem('user')
    window.location.reload()
   }


   private setUserLocalStorage(user: user){
      localStorage.setItem('user', JSON.stringify(user))
   }

   private getUserLocalStorage(){
    const userJson = localStorage.getItem('user')
    if(userJson)
      return JSON.parse(userJson) as user

    return new user()
  }
}

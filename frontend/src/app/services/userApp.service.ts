import { Injectable } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";
import { UserData } from "../models/UserData";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, finalize, of, tap } from "rxjs";

@Injectable()
export class UserAppService {
   user : any;
   loading : boolean;
    constructor(private oauthService: OAuthService,private http: HttpClient) {

    }
    async getUser(): Promise<Observable<UserData>> {
       if (this.user)
       {
        return this.user;
       }
       const res = await this.http.get<UserData | null>(`https://localhost:44362/api/users/${this.getUserEmail()}`).pipe(
        tap( data => {
            this.user = data;
          }),
          catchError(err => {
            return of(null);
          }),
          finalize(() =>this.loading = false)
        );
        return res;
      }

     private getUserEmail() : string{
      this.user = this.oauthService.getIdentityClaims();
      let userinfo = this.getUserInfo();
      //return userinfo.email;
      return "nada@email.com"
     } 
   private getUserInfo() {
        const token = localStorage.getItem("token");
          let payload;
          if (token) {
            payload = token.split(".")[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
          } else {
            return null;
          }
    }

       
}



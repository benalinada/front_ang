import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { OAuthService } from "angular-oauth2-oidc";
import { authConfig } from "../config/auth.config";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor( private oauthService: OAuthService, private router: Router) {
    }
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
      debugger
     
        if (this.oauthService.hasValidAccessToken() ) {
       
          return true;
        } else {

          await this.oauthService.tryLogin({})
          .then(
            async status => {
    
              if (!this.oauthService.hasValidAccessToken()) {
                await this.oauthService.initImplicitFlow()
                return false;
              }
              else {
                return true
              }
    
            }
          ).catch(
            error => {
             return false
            }
    
          );
        }
    }
  }
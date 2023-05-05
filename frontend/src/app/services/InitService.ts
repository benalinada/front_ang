import { Injectable } from "@angular/core";
import { JwksValidationHandler, OAuthService } from "angular-oauth2-oidc";
import { authConfig } from "../config/auth.config";



@Injectable()
export class InitService {
    constructor(private oAuthService: OAuthService) {}

    public initAuth(): (() => Promise<void>) {
      return () =>
        new Promise<void>((res, rej) => {
            this.oAuthService.configure(authConfig);
            this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
            this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
              this.oAuthService.setupAutomaticSilentRefresh();
              res();
            });
          });
      }
  }

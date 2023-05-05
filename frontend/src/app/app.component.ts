import { Component} from '@angular/core';
import { authConfig } from './config/auth.config';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'argon-dashboard-angular';
  constructor(private oauthService: OAuthService) {
    this.configure();
  }

private configure() {
  this.oauthService.configure(authConfig);
  this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  this.oauthService.loadDiscoveryDocumentAndTryLogin();
}

}

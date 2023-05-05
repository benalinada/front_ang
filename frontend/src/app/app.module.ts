import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { ServerService } from 'app/services/server.service';
import { UserAppService } from 'app/services/userApp.service';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { MatCardModule } from '@angular/material/card'
import { NgPipesModule } from 'ngx-pipes';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    MatCardModule,
    MatSlideToggleModule,
    RouterModule,
    NgPipesModule,
    CommonModule,
    AppRoutingModule,
    AuthModule.forRoot({
      config: {
        authority: 'https://localhost:5001',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'acteol',
        scope: 'openid profile email resource1.scope1 resource2.scope1 transaction api1',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
    }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,

  ],
   providers: [
    OAuthService,
    ServerService,
    UserAppService,
    provideOAuthClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

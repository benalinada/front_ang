import { AuthConfig } from "angular-oauth2-oidc";


export const authConfig: AuthConfig = {
  issuer: "https://localhost:5001",
  loginUrl:  'https://localhost:5001/connect/authorize',
  logoutUrl: 'https://localhost:5001/Account/logout',
  redirectUri: 'http://localhost:4200/signin-oidc' ,
  clientId: 'acteol',
  oidc : true,
  userinfoEndpoint :  'https://localhost:5001/connect/userinfo',
  tokenEndpoint :  'https://localhost:5001/connect/token',
  requestAccessToken: true,
  useSilentRefresh: true,
  silentRefreshRedirectUri: window.location.origin + '/assets/silent-refresh.html',
  useIdTokenHintForSilentRefresh: true,
  scope: "openid profile email"
}
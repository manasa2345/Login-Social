import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// http%3A%2F%2Flocalhost%3A4200
// http://localhost:4200
export class LinkedInService {
  linkedInCredentials = {
    clientId: "86fq687nbiqrrq",
    redirectUrl: "http://localhost:4200",
    clientSecret: "IoeBUC21fpWrlGpL"

  };

  link: any;

  constructor(private http: HttpClient) { }

  getLinkedInApi(linkedInCode: any){

    this.link = 'https://www.linkedin.com/oauth/v2/accessToken';

    // x-www-form-urlencoded
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });


    let params = new HttpParams()
    .set('grant_type', 'authorization_code')
    .set('code', linkedInCode)
    .set('redirect_uri', this.linkedInCredentials.redirectUrl)
    .set('client_id',this.linkedInCredentials.clientId)
    .set('client_secret',this.linkedInCredentials.clientSecret);


    return this.http.post(this.link, params.toString(), { headers: httpHeaders });

  }

  getLinkedInDetails(linkedInAccessCode: any) {
    this.link = "https://api.linkedin.com/v2/emailAddress";
    let params = new HttpParams()
    .set('q', 'members')
    .set('projection', '(elements*(handle~))')
    .set('oauth2_access_token', linkedInAccessCode);
    return this.http.get(this.link,{params: params});
  }

}

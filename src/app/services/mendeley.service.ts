import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MendeleyService {

  MendeleyCredentials = {
    clientId: "9386",
    redirectUrl: "http%3A%2F%2Flocalhost%3A4200",
    clientSecret: "JxXY0TeUQPbqlS8n"
  };

  link: any;



  constructor(private http: HttpClient) { }

  getMendeleyApi(mendeleyCode: any) {
    // return this.http.get(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&client_id=${
    //   this.MendeleyCredentials.clientId
    // }&client_secret=${
    //   this.MendeleyCredentials.clientSecret
    // }&code=${
    //   linkedInCode
    // }&redirect_uri=${
    //   this.MendeleyCredentials.redirectUrl
    // }`);


    this.link = 'https://api.mendeley.com/oauth/token';
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', btoa(`${this.MendeleyCredentials.clientId}:${this.MendeleyCredentials.clientSecret}`));
    headers.set('Access-Control-Allow-Origin', "*");
    headers.set("Content-Type", "application/json");
    headers.set("Access-Control-Expose-Headers", "Content-Length");

    let params = new HttpParams();
    params.append('grant_type','client_credentials');
    params.append('scope','all');

    return this.http.post(this.link, {
      headers: headers,
      params: params
    });

  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MendeleyService {

  MendeleyCredentials = {
    clientId: "9386",
    redirectUrl: "http://localhost:4200/",
    clientSecret: "JxXY0TeUQPbqlS8n"
  };

  link: any;



  constructor(private http: HttpClient) { }

  getMendeleyApi(mendeleyCode: any) {


    this.link = 'https://api.mendeley.com/oauth/token';
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${this.MendeleyCredentials.clientId}:${this.MendeleyCredentials.clientSecret}`)
    });


    let params = new HttpParams()
    .set('grant_type','authorization_code')
    .set('code', mendeleyCode)
    .set('redirect_uri',this.MendeleyCredentials.redirectUrl);

    return this.http.post(this.link, params.toString(), { headers: httpHeaders });

  }

  getMendeleyDetails(mendeleyAccessCode: any) {
    this.link = "https://api.mendeley.com/profiles/me";
    const httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + mendeleyAccessCode,
      'Accept': 'application/vnd.mendeley-profiles.1+json'
    });
    return this.http.get(this.link,{headers: httpHeaders});
  }

}

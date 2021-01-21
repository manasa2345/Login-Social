import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

// import 'rxjs/add/operator/catch';
// import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkedInService {
  linkedInCredentials = {
    clientId: "86fq687nbiqrrq",
    redirectUrl: "http%3A%2F%2Flocalhost%3A4200",
    clientSecret: "IoeBUC21fpWrlGpL"

  };

  constructor(private http: HttpClient) { }

  getLinkedInApi(linkedInCode: any){
    // return this.http.get('https://jsonplaceholder.typicode.com/posts');
    // return this.http.get('https://hr-system-12c76.firebaseio.com/');

    // let headers = new HttpHeaders();
    // headers.append('grant_type','authorization_code');
    // headers.append('client_id',this.linkedInCredentials.clientId);
    // headers.append('client_secret',this.linkedInCredentials.clientSecret);
    // headers.append('code',linkedInCode);
    // headers.append('redirect_uri',this.linkedInCredentials.redirectUrl);


    // return this.http.get(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&client_id=86fq687nbiqrrq&client_secret=IoeBUC21fpWrlGpL&code=${
    //   linkedInCode
    // }&redirect_uri=http%3A%2F%2Flocalhost%3A4200`);

    let params = new HttpParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', this.linkedInCredentials.clientId);
    params.append('client_secret', this.linkedInCredentials.clientSecret);
    params.append('code', linkedInCode);
    params.append('redirect_uri', this.linkedInCredentials.redirectUrl);

    let httpHeaders = new HttpHeaders();
    // httpHeaders.set('Access-Control-Allow-Origin', "*");
    httpHeaders.set("Content-Type", "application/json");



    return this.http.post(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&client_id=${
      this.linkedInCredentials.clientId
    }&client_secret=${
      this.linkedInCredentials.clientSecret
    }&code=${
      linkedInCode
    }&redirect_uri=${
      this.linkedInCredentials.redirectUrl
    }`, {
      // headers: httpHeaders
      title: 'LinkedIn Access Token'
    });



    // return this.http.get('https://www.linkedin.com/oauth/v2/accessToken', {
    //   headers: headers,
    //   params: params
    // });

  }

//   private handleError(errorResponse: HttpErrorResponse) {
//     if(errorResponse.error instanceof ErrorEvent) {
//       console.error('Client Side Error: ', errorResponse.error.message);
//     }
//     else {
//       console.error('Server Side Error: ', errorResponse);
//     }

//     return new ErrorObservable('There is a problem');
//   }

}

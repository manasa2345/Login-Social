import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { SocialLoginModule, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

import { LinkedInService } from '../services/linked-in.service';
import { MendeleyService } from '../services/mendeley.service';
import { TwitterService } from '../services/twitter.service';

//For Mendeley icon
import { cibMendeley } from '@coreui/icons';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { TwitterService } from 'ngx-twitter-api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : SocialUser; //After login to store the details
  emailID = 'gundamanasa@gmail.com';
  status : string = 'Not Logged In';
  statusBool : boolean = true;

  linkedInCredentials = {
    clientId: "86fq687nbiqrrq",
    redirectUrl: "http%3A%2F%2Flocalhost%3A4200",
    clientSecret: "IoeBUC21fpWrlGpL"

  };
  linkedInCode: string;


  constructor(
    private socialAuthService: SocialAuthService,
    private route: ActivatedRoute,
    private linkedInApi: LinkedInService,
    public iconSet: IconSetService,
    private mendeleyApi: MendeleyService,
    private twitterApi: TwitterService,
    private http: HttpClient
    )
  {
    //For Mendeley Icon
    iconSet.icons = { cibMendeley };
  }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        if(params.code) {
          this.linkedInCode = params.code;

          if(params.code.length == 27) {
            //To get access token
            this.mendeleyApi.getMendeleyApi(this.linkedInCode).toPromise().then((data: any) => {
              console.log(data);
              //To get email ID
              this.mendeleyApi.getMendeleyDetails(data.access_token).subscribe((result)=>{
                console.log(result);
              });
            });
          }
          else {
            //To get access token
             this.linkedInApi.getLinkedInApi(this.linkedInCode).toPromise().then((data: any) => {
              console.log(data);
              //To get the email ID
              this.linkedInApi.getLinkedInDetails(data.access_token).subscribe((result)=>{
                console.log(result);
                console.log(result.elements[0]['handle~'].emailAddress);
              });
            });
          }


        }
      }
    );

    // The state is checked here if the user is logged in or not for google and fb
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      //This works
      // if(user.email == this.emailID) {
      //   console.log("Logged in");
      //   this.user = user;
      // }
      // else {
      //   this.statusBool = false;
      // }

    })
  }



  signInWithGoogle() : any {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithLinkedin(): void {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=987654321&scope=r_emailaddress&client_id=86fq687nbiqrrq&redirect_uri=http%3A%2F%2Flocalhost%3A4200`;
  }

  signInWithMendeley(): void {
    window.location.href = "https://api.mendeley.com/oauth/authorize?client_id=9386&redirect_uri=http://localhost:4200/&response_type=code&scope=all&state=98765432123456";
  }

  signInWithTwitter(): void {
    window.location.href = "https://api.twitter.com/oauth/request_token?oauth_consumer_key=q7RCfHxv2bQqqGVYhJhZ9yNxq&oauth_nonce=NlOTw6Fs5sv&oauth_signature=syqiKJUCLB/fsW2dXTSnBQIRhQM=&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1610449289&oauth_version=1.0";
  }

  // signOut() : any {
  //   this.socialAuthService.signOut();
  // }




}

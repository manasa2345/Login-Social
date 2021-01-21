import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { SocialLoginModule, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

import { LinkedInService } from '../services/linked-in.service';
import { MendeleyService } from '../services/mendeley.service';

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
    // private twitter: TwitterService
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
            this.mendeleyApi.getMendeleyApi(this.linkedInCode).subscribe((result)=>{
              console.log(result);
            });
          }
          else {
             this.linkedInApi.getLinkedInApi(this.linkedInCode).subscribe((result)=>{
              console.log(result);
            });
          }


        }
      }
    );

    // The state is checked here if the user is logged in or not
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
    // this.twitter.get(
    //   'https://api.twitter.com/1.1/account/verify_credentials.json',
    //   {
    //     count: 5
    //   },
    //   {
    //     consumerKey: 'q7RCfHxv2bQqqGVYhJhZ9yNxq',
    //     consumerSecret: 'ledFgjRj99k8RQHRXKUi0FgYyubjTAAtYP0ZFNsdzgPYaJSClI'
    //   },
    //   {
    //     token: '3230877158-x7gzpu6TjG7VRKc4lzj1JcQjxybIzNhjIzi6fQk',
    //     tokenSecret: 'ZnWqIF9kZPx9zp9MH4KE0hKR9wn0ybgbg8DTY4fyQHWaw'
    //   }
    // ).subscribe((res)=>{
    //     console.log(res);
    // });
  }

  // signOut() : any {
  //   this.socialAuthService.signOut();
  // }




}

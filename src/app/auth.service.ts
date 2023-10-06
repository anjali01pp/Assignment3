import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';


import { Subject ,throwError, BehaviorSubject,Observable} from 'rxjs';
import { tap,catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { DatalayerService } from 'src/app/datalayer.service';
export interface AuthResponseData {
  kind: string;
  idToken: string;
token:string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root'
})


export class AuthService {


  private token: string | null = null;
  beartoken!: string | null
   constructor(private http: HttpClient, private router :Router ,private datalayer:DatalayerService) {}
 
   
  
   signup(username: string, password: string) {
     return this.http
       .post<AuthResponseData>(
         ' http://ztraining.zeronetraining.local/api.publish/api/account',
         {"username":username,"password":password}
       ).pipe(
         tap((resdata) => {
           // Handle success
           this.handleAuthentication(
             resdata.email,
             resdata.idToken,
             resdata.token,
             +resdata.expiresIn
           );
 
          
           this.router.navigate(['/student-list']);
          return resdata;
         
           
         }),
         catchError((error) => {
           // Handle the error
           console.error(error);
 
           // Navigate to the error component
           //this.router.navigate(['/error']);
 
           // Re-throw the error to propagate it further
           return throwError(error);
         })
       );
   }
   public handleAuthentication(
     email: string,
     userId: string,
     token: string,
     expiresIn: number
   ){
     const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    
     
     this.token = token;
    
     
   }
   getToken(): any {
     return this.token;
   }  
  
   }    


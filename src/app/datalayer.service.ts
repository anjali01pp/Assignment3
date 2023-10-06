import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from  '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
@Injectable({
  providedIn: 'root'
})
export class DatalayerService {
  beartoken!: string | null
constructor(private http:HttpClient){

}
  // ngOnInit(){
  
  
  
 
  // }
  
  // getEmployeeData(){
    
   
  
  //   // Set the Authorization header with the bearer token
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.beartoken}`,
  //   });
  
  //   this.http.get('http://ztraining.zeronetraining.local/api.publish/api/employee' , { headers }).subscribe(
  //     (data) => {
  //       // Handle the data here
  //       console.log(data);
  //     },
  //     (error) => {
  //       // Handle any errors here
  //      console.log (error);
  //     }
  //   );
  // }
}

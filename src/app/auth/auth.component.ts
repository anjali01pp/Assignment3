import { Component ,Injectable} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { DatalayerService } from 'src/app/datalayer.service';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  successMessage: string = '';
  errorMessage: string = '';
  error: string = '';
  constructor(private authService: AuthService,private datalayer:DatalayerService) {}

  onSubmit(form: NgForm) {
     
    
    const username = form.value.username;
    const password = form.value.password;
    this.authService.signup(username, password).subscribe(res =>{
    if(res.token != null){
      this.successMessage = 'Successfully logged in!';
      this.errorMessage = ''; 
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }
    
    },
    (error) => {
      console.log(error);
     
      this.successMessage = ''; 
      this.errorMessage = 'Login failed. Please check your credentials.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    }
  );
   
  }
}

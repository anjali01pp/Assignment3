import { Component,Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient ,HttpHeaders } from  '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-studentform',
  templateUrl: './studentform.component.html',
  styleUrls: ['./studentform.component.css']
})

export class StudentformComponent {
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private authservice:AuthService,private router :Router, private route:ActivatedRoute) { }
  employeeid:any;
  studentForm!: FormGroup;
  studentFormput!: FormGroup;
 studentData:any;
 showSuccessMessage :any;
 successMessage: string = '';
  errorMessage: string = '';
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeid  = params['id']; 
      console.log( this.employeeid);
    });
  this.getemployeeedit(this.employeeid );
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [new Date(), Validators.required],
      personalEmail: ['', [Validators.required, Validators.email]],
      mobileNumber: [''],
      postalAddress: [''],
      employeeID: [],
      gender: [],
      country: [''],
      city: [''],
      designation: [],
      basicPay: [],
      needTransportation: [false],
      notes: [''],
      username: ['', Validators.required],
      //  password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]]
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
   
    // this.studentFormput = this.formBuilder.group({
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   dateOfBirth: [new Date(''), Validators.required],
    //   personalEmail: ['', [Validators.required, Validators.email]],
    //   mobileNumber: [''],
    //   postalAddress: [''],
    //   employeeid:[''],
    //   gender: [1],
    //   country: [''],
    //   city: [''],
    //   designation: [],
    //   basicPay: [],
    //   needTransportation: [false],
    //   notes: [''],
    //   username: ['', Validators.required],
    //   // password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]]
    //   password: ['', Validators.required]
    // });
  }


// onSubmit() {
//   if (this.studentForm.valid) {
//     const formData = this.studentForm.value;
   
//     console.log(formData);
//   }
// }




onSubmit() {
  if (this.studentForm.valid) {
    const id = this.employeeid;
    
  const token = this.authservice.getToken();
  

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

  if ( id== null || id ==""){
    
    const formData = this.studentForm.value;
    const dateOfBirth = new Date(formData.dateOfBirth);
    formData.dateOfBirth = dateOfBirth.toISOString();
    delete formData.employeeID;
    this.http.post('http://ztraining.zeronetraining.local/api.publish/api/employee', formData, { headers }).subscribe(
      (response) => {
        if(response){
          this.successMessage = 'Successfully Submitted the data!';
          this.errorMessage = ''; 
          this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
        this.studentForm.reset();

        console.log(response);
      }
      },
      (error) => {
      
        console.error(error);
      }
    );
  }


else {
  this.studentForm.patchValue({
    employeeID: id, 
  });
  const formData = this.studentForm.value;
  const dateOfBirth = new Date(formData.dateOfBirth);
   formData.dateOfBirth = dateOfBirth.toISOString();
  console.log("ffjhjhjkh" ,formData)
  const url= `http://ztraining.zeronetraining.local/api.publish/api/employee/${id}`
  this.http.put(url, formData, { headers }).subscribe(
    (response) => {
      if(response){
        this.successMessage = 'Successfully updated the data!';
        this.errorMessage = ''; 
        this.showSuccessMessage = true;
        setTimeout(() => {
       
          this.showSuccessMessage = false;
        }, 3000);
        this.studentForm.reset();

        console.log(response);
      }
    },
    (error) => {
    
      console.error(error);
    }
  );
}
}
}
passwordMismatch() {
  const passwordControl = this.studentForm.get('password');
  const confirmPasswordControl = this.studentForm.get('confirmPassword');

  if (passwordControl && confirmPasswordControl) {
    return passwordControl.value !== confirmPasswordControl.value && confirmPasswordControl.dirty;
  }

  return false;
}


getemployeeedit(id:any){
 
  const token = this.authservice.getToken();
  const url =`http://ztraining.zeronetraining.local/api.publish/api/employee/${id}`

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  this.http.get( url, { headers }).subscribe(
    (data) => {
      this.studentData = data;

 
      const dateOfBirth = new Date(this.studentData.dateOfBirth).toISOString().split('T')[0];
      if (this.studentForm) {
        this.studentForm.patchValue({
          firstName: this.studentData.firstName,
          lastName: this.studentData.lastName,
          dateOfBirth: dateOfBirth,
          personalEmail: this.studentData.personalEmail,
          mobileNumber: this.studentData.mobileNumber,
          postalAddress: this.studentData.postalAddress,
          gender: this.studentData.gender,
          country: this.studentData.country,
          city: this.studentData.city,
          designation: this.studentData.designation,
          basicPay: this.studentData.basicPay,
          needTransportation: this.studentData.needTransportation,
          notes: this.studentData.notes,
          username: this.studentData.username,
          password: ""
        });
     
        console.log('Type of Gender from API:', typeof this.studentData.gender);
      }
    },
    (error) => {
      console.error(error);
    }
  );
   
}

}

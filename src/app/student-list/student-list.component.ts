import { Component, OnInit ,HostListener,HostBinding,Injectable,ChangeDetectorRef } from '@angular/core';
import { DatalayerService } from '../datalayer.service';
import { HttpClient ,HttpHeaders } from  '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentformComponent } from '../studentform/studentform.component';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent  {
  students: any[] =[];
  currentPage = 1;
  totalPages!: number;
  pageSize = 10; 
 employeecount: any;
  beartoken!: string | null;
  confirmationDialogVisible = false;
  confirmationMessage = '';
  studentToDelete!: any;
  constructor(private http:HttpClient,private datalayer:DatalayerService,private authservice:AuthService,private router :Router,private studentform:StudentformComponent,private cdr: ChangeDetectorRef){
 
   
  
  }
  ngOnInit(){
    
    //this.getEmployeeData();
    this.fetchEmployeeData();
    this.getEmployeeCount();

  }
  getEmployeeData(){
    
    const token = this.authservice.getToken();
    
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    this.http.get('http://ztraining.zeronetraining.local/api.publish/api/employee' , { headers }).subscribe(
      (data) => {
       
       
         this.students=this.students.concat(data);
       
        console.log( this.students)
     
      },
      (error) => {
        
       console.log (error);
      }
    );
  }
  @HostBinding('class.flipped') flipState: { [key: string]: boolean } = {};
  public isFoo: Boolean = false;
 public hoveredstudent :any;
  @HostListener('mouseenter')
  onMouseEn(student:any) {
    if (student && student.employeeID) {
   this.hoveredstudent =student.employeeID;
  
    setTimeout(() => {
      if(this.hoveredstudent === student.employeeID){
        this.flipState[student.employeeID] = true; 
        this.isFoo = true;
      }
    }, 5000);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(student:any): void  {
    if (student && student.employeeID) {
    this.hoveredstudent=null;
    this.flipState[student.employeeID] = false;
    }
  
   
  }

 Addemployee(){
  this.router.navigate(['/studentform']);
 }
 Editemployee(id:any){
  this.router.navigate(['/studentform', id]);
  this.studentform.getemployeeedit(id);
    
  
  }
 
  fetchEmployeeData(): void {
    const token = this.authservice.getToken();
   
    const url=  `http://ztraining.zeronetraining.local/api.publish/api/employee/paged/${this.pageSize}/${this.currentPage}/employeeID/desc`;
   
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    this.http.get(url , { headers }).subscribe(
      (data) => {
        
        this.students = [];
         this.students=this.students.concat(data);
         this.calculateTotalPages();
       
      },
      (error) => {
      
       console.log (error);
      }
    );
  }
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.employeecount / this.pageSize);
    if (this.totalPages < this.currentPage) {
      this.currentPage = this.totalPages;
    }
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchEmployeeData();
    }
  }
  
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchEmployeeData();
    }
  }

 

  DeleteEmployeeid(id:any){
    const token = this.authservice.getToken();
   const iD = id;
    const url=  `http://ztraining.zeronetraining.local/api.publish/api/employee/${iD} `;
   
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    this.http.delete(url , { headers }).subscribe(
      (Response) => {
        this.students = [];
        this.fetchEmployeeData();
        console.log( this.students)
     
      },
      (error) => {
    
       console.log (error);
      }
    );
  }

  showDeleteConfirmation(id: any) {
    this.studentToDelete = id;
    this.confirmationMessage = `Are you sure you want to delete ?`;
    this.confirmationDialogVisible = true;
  }
  handleDeleteConfirmation(confirmed: boolean) {
    if (confirmed) {
      // Handle student deletion here
      this.DeleteEmployeeid(this.studentToDelete); // Replace 'id' with your student ID property
    }
    this.confirmationDialogVisible = false;
  }

  cancelDelete() {
    this.confirmationDialogVisible = false;
  }

  getEmployeeCount(){
    
    const token = this.authservice.getToken();
    
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    this.http.get('http://ztraining.zeronetraining.local/api.publish/api/employee/count' , { headers }).subscribe(
      (data) => {
       
       this.employeecount =data;
       
        console.log( data)
     
      },
      (error) => {
        
       console.log (error);
      }
    );
  }







}

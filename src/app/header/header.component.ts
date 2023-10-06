import { Component ,Injectable} from '@angular/core';
import { StudentformComponent } from '../studentform/studentform.component';
import { StudentListComponent } from '../student-list/student-list.component';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  constructor(private router :Router,private studentform:StudentListComponent,private studentsform:StudentListComponent){
   
   
  
  }
  Getallstudents(){
   this.studentform.getEmployeeData();
   this.router.navigate(['/student-list']);
   }
}

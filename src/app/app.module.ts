import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentformComponent } from './studentform/studentform.component';
import { HeaderComponent } from './header/header.component';
import { DeletepopupComponent } from './deletepopup/deletepopup.component';
const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'student-list', component: StudentListComponent },
  { path: 'studentform', component: StudentformComponent },
  { path: 'studentform/:id', component: StudentformComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    StudentListComponent,
    StudentformComponent,
    HeaderComponent,
    DeletepopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }

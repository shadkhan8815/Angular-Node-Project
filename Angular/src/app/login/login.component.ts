import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: any = {
    data: {},
    inputError:'',
    message: ''
  }

  constructor(public router: Router, private httpService: HttpServiceService) {

  }

  signIn() {

     var self = this;

  this.httpService.post('http://localhost:8080/Auth/login', this.form.data, function (response: any) {
  
    console.log("data == > ", response.result.data);
      console.log("message == > ", response.result.message)
      console.log("success ==> ", response.success)
      console.log("inputerror ==> ", response.result.inputerror)

      if (!response.success && response.result.message) {
        self.form.message = response.result.message
      }

      if (response.result.inputerror) {
        self.form.inputerror = response.result.inputerror;

      }

      if (response.success) {
        localStorage.setItem('firstName', response.result.data.firstName);
        localStorage.setItem('roleName', response.result.data.roleName);
        localStorage.setItem('id', response.result.data.id);
        self.router.navigateByUrl('welcome');
      }

    })

  }

}
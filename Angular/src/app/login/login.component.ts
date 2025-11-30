import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: any = {
    data: {},
    inputError:''
  }

  constructor(public router: Router) {

  }

  signIn() {

    if (this.form.data.login == 'admin' && this.form.data.password == 'admin') {
      this.router.navigateByUrl('welcome')
    } else {
      this.form.inputError = 'login or password is invalid'
      this.router.navigateByUrl('login');
    }

  }


}

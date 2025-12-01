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
    inputError:''
  }

  constructor(public router: Router, private httpService: HttpServiceService) {

  }

  signIn() {

  this.httpService.post('http://localhost:8080/Auth/login', this.form.data, (response: any) => {
    console.log('response from signIn api===>', response);

    console.log("login api response ===>", response);

    // Universal success check
    if (response && Object.keys(response).length !== 0) {

      // Store user (optional)
      localStorage.setItem("user", JSON.stringify(response));

      // Redirect to welcome
      this.router.navigate(['/welcome']);
    } else {
      // Error message show karo
      this.form.inputError = "Invalid LoginId or Password";
    }

  });

}

}

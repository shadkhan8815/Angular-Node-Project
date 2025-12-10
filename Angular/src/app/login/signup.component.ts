
import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private httpService: HttpServiceService) { }



  form: any = {
    data: {},
    inputError: '',
    message: ''
  }

  signUp() {
    console.log('in signUp() function')
    console.log('firstName==> ', this.form.data.firstName)
    console.log('lastName===>', this.form.data.lastName)
    console.log('login======>', this.form.data.login)
    console.log('password===>', this.form.data.password)
    console.log('dob========>', this.form.data.dob)

    this.httpService.post('http://localhost:8080/Auth/signUp', this.form.data, (response: any) => {
      console.log('response from signup api===>', response)
      if (!response.success && response.result.message) {
        this.form.message = response.result.message
      }

      if (response.result.inputerror) {
        this.form.inputError = response.result.inputerror;
      }

      if (response.success) {
        this.form.message = 'Signup successful! Please login.';
      }
    })

  }

}

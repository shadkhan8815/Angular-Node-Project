import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  form: any = {

    data: {},
    message: ''

}

  constructor(public router: Router, public httpService: HttpServiceService) {}

  isLogin() {
    let check = localStorage.getItem('firstName');
    if (check != 'null' && check != null) {
      this.form.data.firstName = localStorage.getItem('firstName');
      this.form.data.roleName = localStorage.getItem('roleName');
      this.form.data.id = localStorage.getItem('id');
      return true;
    } else {
      return false;
    }
  }

  logout() {
    var self = this;
    this.httpService.get('http://localhost:8080/Auth/logout', function (res: any) {
      localStorage.clear();
      console.log("success ==> ", res.success);
      console.log("Logout response: ", res.result.message);
      self.form.message = res.result.message;
      self.router.navigateByUrl('login');
    });
  }
}
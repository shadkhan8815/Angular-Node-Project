import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  form: any = {

    data:{},
    inputerror: {},
    message: '',
    preload: []

}

constructor(private httpService: HttpServiceService, private httpClient: HttpClient) { }

ngOnInit(): void {
  this.preload();
}

preload() {
    var self = this
    this.httpService.get('http://localhost:8080/User/preload', function (res: any) {
      console.log(res)
      self.form.preload = res.result.roleList;
    });
  }

  save() {
    var self = this
    this.httpService.post('http://localhost:8080/User/save', this.form.data, function (res: any) {
      console.log('res => ', res)

      self.form.message = '';
      self.form.inputerror = {};

      if (res.result.message) {
        self.form.message = res.result.message;
      }

      if (!res.success) {
        self.form.inputerror = res.result.inputerror;
      }

      if (res.success) {
        self.form.data.id = res.result.data;
      }

    });
  }


}
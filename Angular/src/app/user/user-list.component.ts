import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit { 

   form: any = {
    list: [],
    searchParams: {},
    pageNo: 0,
    deleteParams: [],
    message: '',
    preload: []
  }

  constructor(private httpService: HttpServiceService, private router: Router) { }

  ngOnInit(): void {
    this.preload();
    this.search();
  }
  
  preload() {
    var self = this
    this.httpService.get('http://localhost:8080/User/preload', function (res: any) {
      console.log(res)
      self.form.preload = res.result.roleList;
    });
  }

  previous() {
    this.form.pageNo--;
    this.search();
  }

  next() {
    this.form.pageNo++;
    this.search();
  }

  onClickCheckBox(userId: any) {
    this.form.deleteParams = userId;
  }

  search() {
    var self = this
    this.httpService.post('http://localhost:8080/User/search/' + this.form.pageNo, this.form.searchParams, function (res: any) {
      console.log("res ==> ", res);
      self.form.list = res.result.data;
    })
  }

  delete() {
    var self = this
    this.httpService.get('http://localhost:8080/User/delete/' + this.form.deleteParams, function (res: any) {

      if (res.success) {
        self.form.message = res.result.message;
      }

      self.search()

    })
  }

}
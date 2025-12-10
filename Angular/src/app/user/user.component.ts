
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../http-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  form: any = {
    data: {},
    inputerror: {},
    message: '',
    preload: []
  }

  fileToUpload: any = null;

  constructor(private httpService: HttpServiceService, private httpClient: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe((params: any) => {
      this.form.data.id = params["id"];
      console.log('id===>', this.form.data.id)
    })
  }

  ngOnInit(): void {
    this.preload();
    if (this.form.data.id && this.form.data.id > 0) {
      this.display();
    }
  }

  formatDateForInput(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  preload() {
    var self = this
    this.httpService.get('http://localhost:8080/User/preload', function (res: any) {
      console.log(res)
      self.form.preload = res.result.roleList;
    });
  }

  display() {
    var self = this
    this.httpService.get('http://localhost:8080/User/get/' + this.form.data.id, function (res: any) {
      console.log(res)
      self.form.data = res.result.data;
      self.form.data.dob = self.formatDateForInput(self.form.data.dob);
      console.log('formatted date => ', self.form.data.dob);
    });
  }


  onFileSelect(event: any) {
    this.fileToUpload = event.target.files.item(0);
    console.log(this.fileToUpload);
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

      if (self.fileToUpload != null) {
        self.myFile();
      }

    });
  }


  myFile() {
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    return this.httpClient.post("http://localhost:8080/User/profilePic/" + this.form.data.id, formData, { withCredentials: true }).subscribe((res: any) => {
      console.log(this.fileToUpload);
      console.log('file upload res => ', res);
    }, error => {
      console.log(error);
    });
  }

}

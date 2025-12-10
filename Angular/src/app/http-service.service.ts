
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(public httpClint: HttpClient, private router: Router) { }

  post(endpoint: any, bean: any, callback: any) {
    this.httpClint.post(endpoint, bean, { withCredentials: true }).subscribe((response) => {
      callback(response);
    }, (error) => {
      console.error('HTTP POST Error:', error);
      this.handleError(error);
    });
  }

  get(endpoint: any, callback: any) {
    this.httpClint.get(endpoint, { withCredentials: true }).subscribe((response) => {
      callback(response);
    }, (error) => {
      console.error('HTTP GET Error:', error);
      this.handleError(error);
    });
  }

  private handleError(error: any): void {
    console.error('Request failed', error);
    if (error.status === 401) {
      localStorage.clear();
      this.router.navigate(['/login'], {
        queryParams: { errorMessage: error.error.error }
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  login() {
    const usernameField = document.getElementById('username') as HTMLInputElement;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    const json = {'username': usernameField.value, 'password': passwordField.value};
    this.http.post('http://localhost:8080/WebShopDWP/rest/user/login', JSON.stringify(json),
      {headers: {'Content-Type': 'application/json'}})
      .subscribe(data => {
        console.log(data['status']);
        if (data['status'] !== 'FAIL') {
          sessionStorage.setItem('user', data['status']);
          this.router.navigate(['./dashboard']);
        }else {
          alert('Login failed');
        }
      });
  }

  ngOnInit() {
    if (sessionStorage.getItem('user') != null) {
      this.router.navigate(['/dashboard']);
    }
  }

}

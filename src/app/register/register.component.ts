import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  registerUser() {

    const usernameField = document.getElementById('username') as HTMLInputElement;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    const json = {'username': usernameField.value, 'password': passwordField.value};
    this.http.post('http://localhost:8080/WebShopDWP/rest/user/register', JSON.stringify(json),
      {headers: {'Content-Type': 'application/json'}})
      .subscribe(data => {
        console.log(data['status']);
        if (data['status'] === 'OK') {
          alert('Registration successful');
          this.router.navigate(['./dashboard']);
        }
      });
  }

}

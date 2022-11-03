import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../service/login.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  model: any = {};
  sessionId: any = "";

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  @Input() error?: string | null;

  login(){

    console.log(this.form.value.username, this.form.value.password)

    this.loginService.signIn(
      this.form.value.username,
      this.form.value.password
    ).subscribe(result=>{
      console.log(result)
      if (result){
        console.log(result)
        this.sessionId = result.sessionId;
        sessionStorage.setItem(
          'token',
          this.sessionId
        );
        // this.router.navigate(['']);
      }else {
        alert("Authentication failed.")
      }
    });
  }

}

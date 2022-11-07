import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl('')
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registerService: LoginService
  ) { }

  ngOnInit(): void {
  }

  @Input() error?: string | null;

  register(){
    if (this.form.value.password != this.form.value.password2){
      this.error = "Las contraseñas no coinciden";
    }
    else {
      this.registerService.register(
        this.form.value.username,
        this.form.value.password
      ).subscribe(result => {
        console.log(result);
      });
    }
  }

}

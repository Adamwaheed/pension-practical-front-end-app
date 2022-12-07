import {Component} from '@angular/core';
import {AuthService} from '../../auth.service';
import {DomSanitizer} from '@angular/platform-browser';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });


  constructor(
    public authService: AuthService,
    public domSanitizer: DomSanitizer,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(res => {
      this.authService.setToken(res.access_token);
      this.router.navigate(['/']);
    })
  }
}

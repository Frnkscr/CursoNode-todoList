import { Component, OnInit } from '@angular/core';
import { AlertService } from '../shared/services/alert.service';
import { Form, FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../moduls/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
  
})
export class SingupComponent implements OnInit {
  passwordPreviews = {
    first: true,
    confirm: true
  }


  signupForm: FormGroup;
  submitedForm: boolean = false;
  errorMessage: string = '';

  firstStatus: boolean = false;

  passText: string = 'Contraseña';
  constructor(
    private alertService: AlertService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
    
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/nome']);
      return;
    }
  }

  buildForm() {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      secondName: ['', [Validators.required]],
      email: ['', [
        Validators.required, 
        Validators.email, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]
        ,this.checkValidEmail()],
      username: ['', [Validators.required], this.checkValidUsername()],
      passwords: this.fb.group({
        psw: ['', [Validators.required]],
        confirm: ['', [Validators.required]]
      }, {
          validator: (group: FormGroup) => {
            let first = group.get('psw').value;
            let confirm = group.get('confirm').value;
            return first === confirm ? null : { notSame: true }
          }
        }
      )
    })
    this.signupForm.valueChanges
      .subscribe(() => {
        this.errorMessage = '';
        this.submitedForm = false;
      })
  }

  checkValidUsername(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return this.authService.findUsername(control.value)
        .pipe(
          map((res: any) => {
            return res.username ? { usernameExists: true } : null
          })
        )
    }
  }

  checkValidEmail(): AsyncValidatorFn {
    console.log('Validando Correo');
    return (control: AbstractControl): Observable<any> => {
      return this.authService.findEmail(control.value)
        .pipe(
          map((res: any) => {
            return res.email ? { emailExists: true } : null
          })
        )
    }
  }

  getIcon(value: boolean): string {
    if (value) {
      return 'eye';
    } else {
      return 'eye-slash';
    }
  }

  signup(event: Event): void {
    event.preventDefault();
    this.submitedForm = true;

    if (this.signupForm.invalid) {
      this.errorMessage = 'Porfa no la cagues y revisa los campos';
      return;
    }


    this.alertService.show({
      title: 'Alerta',
      body: '¿Estas seguro de registarse?',
      cancelButton: true,
      type:'error'
    }).then((result) => {
      let user: User = this.signupForm.value;
      user.password = this.signupForm.value.passwords.psw;

      if (result.action =='accept'){
        this.authService.signup(user)
        .subscribe((res)=>{
          
          this.authService.setAuthToken(res)
          
          this.authService.getAuth()
            .subscribe((authUser)=> {
              this.authService.setAuthUser(authUser);
              this.router.navigate(['/home']);
            })
          
          console.log(res);
          console.log('registro Exitoso')
        },(err)=> {
          console.log(err);
          console.log('registro fallido');

          this.alertService.show({
            body: err.error.message || err.message
          })

          })
      }

    }

    )

    //let user = this.signupForm.value;


  }



}

import { Component, OnInit } from '@angular/core';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {
  passwordPreviews = {
    first: true,
    confirm:true
  }
  
  firstStatus: boolean = false;
  
  passText: string = 'Contraseña';
  constructor(
      private alertService: AlertService
  ) { }

  ngOnInit() {
  }
  
  getIcon(value:boolean):string {
    if(value){
      return 'eye';
    }else{
      return 'eye-slash';
    }
  }

  signup(event: Event): void{
    event.preventDefault();

    this.alertService.show({
      title: 'Alerta',
      body:'¿Estas seguro de registarse?'
    })
  }

}

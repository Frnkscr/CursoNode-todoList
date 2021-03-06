import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AlertModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    HttpClientModule
  ],
  exports:[
    AlertModalComponent,
    FontAwesomeModule

  ],
  providers:[
    AuthService
  ]
})

export class SharedModule {
  constructor(){
    library.add(fas);
  }
 }

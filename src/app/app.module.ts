import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { SharedModule} from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


  constructor(){
    library.add(fas);
  }
 }

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomAlert } from 'src/app/moduls/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertSubject: Subject<{
    resolve: (vaule:{ action: 'accept'|'cancel'}) => void | 
    PromiseLike < { action: 'accept'|'cancel'} >, 
    info: CustomAlert
  }>

  constructor() {
    this.alertSubject = new Subject();
   }
  
   show(obj: CustomAlert): Promise<{action : 'accept' | 'cancel' }> {
    return new Promise((resolve,rejeact)=>{
      this.alertSubject.next({
        resolve, // Esto es equivalente a "resolve: resolve" ya que existe una variable o agumento con ese mismo nombre 
        info: obj
      });
    })
  }
}

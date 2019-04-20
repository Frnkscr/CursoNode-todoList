import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomAlert } from 'src/app/moduls/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertSubject: Subject<CustomAlert>

  constructor() {
    this.alertSubject = new Subject();
   }
  
   show(obj: CustomAlert): Promise<any> {
    return new Promise((resolve,rejeact)=>{
      this.alertSubject.next(obj);
    })
    

  }

}

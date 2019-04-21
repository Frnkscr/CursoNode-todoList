import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertService } from '../../services/alert.service';
import { CustomAlert } from 'src/app/moduls/alert';



@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
  providers: [BsModalService]
})
export class AlertModalComponent implements OnInit {
  @ViewChild('template') template: TemplateRef<any>;
  modalRef: BsModalRef;
  resolveFn: (vaule:{ action: 'accept'|'cancel'}) => void;

  alertInfo: CustomAlert = {
    //aceptButtonText: 'Aceptar',
    cancelButton: false,
    cancelButtonText: 'Cancelar',
    body: '',
    title: 'Alerta',
    type: 'error'
  }

  constructor(
    private modalService: BsModalService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.alertSubject
      .subscribe((obj)=> {
        /* this.modalTitle = obj.title;
        this.modalBody = obj.body; */
        this.alertInfo = Object.assign(<CustomAlert>{
          aceptButtonText: 'Aceptar',
          cancelButton: false,
          cancelButtonText: 'cancel',
          body: '',
          title: 'Alerta',
          type: 'success'
        },obj.info);

        this.resolveFn = obj.resolve;

        this.openModal(this.template);
      })
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(){
    this.modalRef.hide();
  }


  accept(): void {
    if(this.resolveFn && typeof this.resolveFn === 'function'){
      this.resolveFn({action: 'accept'});
      this.modalRef.hide();
    }
  }
  
  cancel(): void {
      if(this.resolveFn && typeof this.resolveFn === 'function'){
        this.resolveFn({action: 'cancel'});
        this.modalRef.hide();
      }
  }

}

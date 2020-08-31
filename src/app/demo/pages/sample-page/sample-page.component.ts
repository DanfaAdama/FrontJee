import { EditCustumersComponent } from './../../../edit-custumers/edit-custumers.component';
import { RoleData } from './../../../modele/RoleData';
import { CustumersComponent } from './../../../custumers/custumers.component';
import { CustumersService } from './../../../custumers.service';
import { CustumerData } from './../../../modele/CustumerData';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss']
})
export class SamplePageComponent implements OnInit {
  data: CustumerData[];
  custumer :CustumerData;
  roles = [];
  selected:RoleData;
  deleteId : number;
  modalUsers: any;
  items = []
  public noDirectionPage: number;
  public advancePage: number;
  page = 1;
  constructor(private modalService: NgbModal,private custumerService: CustumersService) {
    this.noDirectionPage = 4;
    this.advancePage =5;
   }

  
  ngOnInit():void {
   this.getCustumers();
  this.custumer = new CustumerData();


  }
  getCustumers() {
    this.custumerService.getCustumers()
      .subscribe(rest => {
        console.log(rest);
        this.data = rest;
        
      },
        err => console.log(err)
      )
  }
  openuser(custumer){
    const modalref = this.modalService.open(EditCustumersComponent);
    modalref.componentInstance.custumer = custumer;
    modalref.componentInstance.passEntry.subscribe((receivedData)=>{
        console.log(receivedData);
        this.custumerService.saveOrUpdateCustumers(receivedData).
        subscribe(
          res => {
            this.getCustumers();
            console.log(res);
          },
          err => console.log(err)
        );
    })

  }
  laodCustumers(){
    const modalre = this.modalService.open(CustumersComponent);
    modalre.componentInstance.custumer = this.custumer;
    modalre.componentInstance.passEntry.subscribe((receivedDatas)=>{
        console.log(receivedDatas);
        this.custumerService.saveOrUpdateCustumers(receivedDatas).
        subscribe(
          res => {
            this.getCustumers();
            console.log(res);
          
          },
          err => console.log(err)
        );

    })
  }


 deleteUser(id,templates:TemplateRef<any>)
 {
  this.deleteId = id;
  this.modalUsers = this.modalService.open(templates);
 }
          delete(){
            this.custumerService.deleteCustumers(this.deleteId).
            subscribe(
              res => {
                this.getCustumers();
                this.modalUsers.close();
              },
              err => console.log(err)
            );
          }
    
}

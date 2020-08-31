import { CustumersService } from './../custumers.service';
import { RoleData } from './../modele/RoleData';
import { RessourceService } from './../ressource.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustumerData } from './../modele/CustumerData';
import { PowerCardChart2 } from './../demo/dashboard/dash-default/chart/power-card-chart-2';
import { PowerCardChart1 } from './../demo/dashboard/dash-default/chart/power-card-chart-1';
import { SeoChart3 } from './../demo/dashboard/dash-default/chart/seo-chart-3';
import { SeoChart2 } from './../demo/dashboard/dash-default/chart/seo-chart-2';
import { SeoChart1 } from './../demo/dashboard/dash-default/chart/seo-chart-1';
import { SupportChartData2 } from './../demo/dashboard/dash-default/chart/support-chart-data-2';
import { SupportChartData1 } from './../demo/dashboard/dash-default/chart/support-chart-data-1';
import { NextConfig } from './../app-config';
import { Component, OnInit, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-custumers',
  templateUrl: './custumers.component.html',
  styleUrls: ['./custumers.component.scss']
})
export class CustumersComponent implements OnInit {
  @Input() public custumer:CustumerData;
  items = [];
  roles: RoleData[];
  @Output() public passEntry = new EventEmitter();
  constructor(public activeModal: NgbActiveModal,private custumerService: CustumersService) { }

  ngOnInit(): void {
    this.custumerService.getRoles().
    subscribe((
      data:RoleData[]) =>{
       this.roles = data;
        console.log('roles2', this.roles);
      });
 
  }
  
  getValues(){
    console.log("select roles", this.custumer.roles)
  }
  
  save()
  {

     this.passEntry.emit(this.custumer);
      this.activeModal.close();
  }

}

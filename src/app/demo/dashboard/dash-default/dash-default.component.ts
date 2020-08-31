import { HttpClient } from '@angular/common/http';
import { ModalEditStockComponent } from './../../../modal-edit-stock/modal-edit-stock.component';
import { StockService } from './../../../stock.service';
import { AddStockComponent } from './../../../add-stock/add-stock.component';
import { ModalEditProduitComponent } from './../../../modal-edit-produit/modal-edit-produit.component';
import { AddProduitComponent } from './../../../add-produit/add-produit.component';
import { ProduitService } from './../../../produit.service';
import { ProduitData } from './../../../modele/ProduitData';
import { ModalDeleteCategorieComponent } from './../../../modal-delete-categorie/modal-delete-categorie.component';
import { AddCategorieComponent } from './../../../add-categorie/add-categorie.component';
import { ModalEditCategorieComponent } from './../../../modal-edit-categorie/modal-edit-categorie.component';
import { CategoryService } from './../../../category.service';
import { Component, OnInit, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { SupportChartData1} from './chart/support-chart-data-1';
import { SupportChartData2} from './chart/support-chart-data-2';
import { SeoChart1 } from './chart/seo-chart-1';
import { SeoChart2 } from './chart/seo-chart-2';
import { SeoChart3 } from './chart/seo-chart-3';
import { PowerCardChart1 } from './chart/power-card-chart-1';
import { PowerCardChart2 } from './chart/power-card-chart-2';
import { CategoryData } from 'src/app/modele/CategoryData';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteProduitComponent } from 'src/app/modal-delete-produit/modal-delete-produit.component';
import { StockData } from 'src/app/modele/StockData';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';

class DataTablesResponse {
  donnes: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-dash-default',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dash-default.component.html',
  styleUrls: ['./dash-default.component.scss']
})
export class DashDefaultComponent implements OnInit {
  
  data: CategoryData[];
  categorie: CategoryData;

  
  datas:ProduitData[];
  produit:ProduitData;
  datastocks: StockData[];
  stock :StockData;
  public noDirectionPage: number;
  public advancePage: number;
  avatar = "assets/img/avatars/empty-img.png";
  dtOptions: DataTables.Settings = {};

  public supportChartData1: any;
  public supportChartData2: any;
  public seoChartData1: any;
  public seoChartData2: any;
  public seoChartData3: any;
  public powerCardChartData1: any;
  public powerCardChartData2: any;
  currentId: number;
   modalCateg: any;
   modalProd: any;
  courantId: number;
  deleteId : number;
  modalStock: any;
  page = 1;


  constructor(private categoryService: CategoryService,private modalService: NgbModal,private produitService:ProduitService,private stockService:StockService,
    private changeDetectorRef: ChangeDetectorRef,public sanitizer: DomSanitizer,private http: HttpClient) {
      this.noDirectionPage = 4;
    this.advancePage =5;
      this.supportChartData1 = SupportChartData1.supportChartData;
    this.supportChartData2 = SupportChartData2.supportChartData;
    this.seoChartData1 = SeoChart1.seoChartData;
    this.seoChartData2 = SeoChart2.seoChartData;
    this.seoChartData3 = SeoChart3.seoChartData;
    this.powerCardChartData1 = PowerCardChart1.powerCardChartData;
    this.powerCardChartData2 = PowerCardChart2.powerCardChartData;
  }
  
  ngOnInit():void {
    this.getCategorie();
    this.categorie = new CategoryData();
   this.getStocks();
   this.stock = new StockData();
  this.produit = new ProduitData();
   this.getProduit();
 
 }
   

  

  getProduit() {
    this.produitService.getProduit()
      .subscribe(rest => {
        console.log(rest);
        this.datas = rest;
        this.changeDetectorRef.detectChanges();
      },
        err => console.log(err)
      )

  }

  getCategorie(){
    this.categoryService.getCategorie()
    .subscribe(
      rest => {
        console.log(rest);
        this.data = rest;
        this.changeDetectorRef.detectChanges();
      },
        err => console.log(err)
    )
    

  }
  getStocks(){
    this.stockService.getStock()
    .subscribe(
      rest => {
        console.log(rest);
        this.datastocks = rest;
        this.changeDetectorRef.detectChanges();
      },
        err => console.log(err)
    )

  }
  open(data){
    const modalref = this.modalService.open(ModalEditCategorieComponent);
    modalref.componentInstance.data = data;
    modalref.componentInstance.passEntry.subscribe((receivedData)=>{
        console.log(receivedData);
        this.categoryService.saveOrUpdateCategorie(receivedData).
        subscribe(
          res => {
            this.getCategorie();
            console.log(res);
          },
          err => console.log(err)
        );
    })
  }
  openproduct(datas){
    const modalref = this.modalService.open(ModalEditProduitComponent);
    modalref.componentInstance.datas = datas;
    modalref.componentInstance.passEntry.subscribe((receivedData)=>{
        console.log(receivedData);
        this.produitService.saveOrUpdateProduit(receivedData).
        subscribe(
          res => {
            this.getProduit();
            console.log(res);
          },
          err => console.log(err)
        );
    })

  }
  openpstock(datastocks)
  {
    const modalrefer = this.modalService.open(ModalEditStockComponent);
    modalrefer.componentInstance.datastocks = datastocks;
    modalrefer.componentInstance.passEntry.subscribe((receivedData)=>{
        console.log(receivedData);
        this.stockService.saveOrUpdateStock(receivedData).
        subscribe(
          res => {
            this.getStocks();
            console.log(res);
          },
          err => console.log(err)
        );
    })

  }
  deleteModal(id,temp:TemplateRef<any>){
    this.currentId = id;
    this.modalCateg = this.modalService.open(temp);
  }
  deleteModalproduct(id,templat:TemplateRef<any>){
this.courantId = id;
this.modalProd = this.modalService.open(templat);
  }
  deleteModalStock(id,templates:TemplateRef<any>){
    this.deleteId = id;
    this.modalStock = this.modalService.open(templates);
      }

  

  deletep(){
    this.produitService.deleteProduits(this.courantId).
    subscribe(
      res => {
        this.getProduit();
        this.modalProd.close();

      },
      err => console.log(err)
    );
  }

  deletestock(){
    this.stockService.deleteStock(this.deleteId).
    subscribe(
      res => {
        this.modalStock.close();
        this.getStocks();
      },
      err => console.log(err)
    );
  }
  delete(){
    this.categoryService.deleteCategorie(this.currentId).
    subscribe(
      res => {
        this.getCategorie();
        console.log(res);
        //this.modalCateg.close();
      },
      err => console.log(err)
    );
  }
  
  laodForm(){
    const modalref = this.modalService.open(AddCategorieComponent);
    modalref.componentInstance.categorie = this.categorie;
    modalref.componentInstance.passEntry.subscribe((receivedData)=>{
        console.log(receivedData);
        this.categoryService.saveOrUpdateCategorie(receivedData).
        subscribe(
          res => {
            this.getCategorie();
            console.log(res);
          },
          err => console.log(err)
        );

    })
  }
  laodProduit(){
    const modalreference = this.modalService.open(AddProduitComponent);
    modalreference.componentInstance.produit = this.produit;
    modalreference.componentInstance.passEntry.subscribe((receivedDatas)=>{
        console.log(receivedDatas);
        this.produitService.saveOrUpdateProduit(receivedDatas).
        subscribe(
          res => {
            this.getProduit();
            console.log(res);
          },
          err => console.log(err)
        );

    })
  }
  laodStocks(){
    const modalre = this.modalService.open(AddStockComponent);
    modalre.componentInstance.stock = this.stock;
    modalre.componentInstance.passEntry.subscribe((receivedDatas)=>{
        console.log(receivedDatas);
        this.stockService.saveOrUpdateStock(receivedDatas).
        subscribe(
          res => {
            this.getStocks();
            console.log(res);
          },
          err => console.log(err)
        );

    })
  }

}

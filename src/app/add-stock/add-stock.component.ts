import { RessourceService } from './../ressource.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProduitData } from './../modele/ProduitData';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StockData } from '../modele/StockData';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {
  @Input() public stock:StockData;
  produits: ProduitData[];
  @Output() public passEntry = new EventEmitter();
  constructor(public activeModal: NgbActiveModal,private ressourceservice: RessourceService) { }


  ngOnInit(): void {
    // this.ressourceservice.getProduit().
    // subscribe(
    //   res => {
    //     this.produits = res;
    //     console.log(res);
    //   },
    //   err => console.log(err)
    // );
    this.ressourceservice.getProduit().
    subscribe((
      data:ProduitData[]) =>{
       this.produits = data;
        console.log('produit', this.produits);
      });
  
  }
  save()
  {
      this.passEntry.emit(this.stock);
      this.activeModal.close();
  }

}

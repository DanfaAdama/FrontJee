import { PanierService } from './../../../../panier.service';
import { CommandeData } from './../../../../modele/CommandeData';
import { CommandesService } from './../../../../commandes.service';
import { ProduitService } from './../../../../produit.service';
import { CategoryService } from './../../../../category.service';
import { ProduitData } from './../../../../modele/ProduitData';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { CategoryData } from 'src/app/modele/CategoryData';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-basic-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic-button.component.html',
  styleUrls: ['./basic-button.component.scss']
})
export class BasicButtonComponent implements OnInit {
  public radioButtons: string;
  public checkBox: any;
  data: CategoryData[];
  categorie: CategoryData;
  datas:ProduitData[];
  // produit:ProduitData;
  @Input() produit: ProduitData;
  commande: CommandeData;
  commandes: CommandeData[];
  category:string;
  avatar = "assets/img/avatars/user.png";
  constructor(private categoryService: CategoryService,private modalService: NgbModal,private produitService:ProduitService,
    private changeDetectorRef: ChangeDetectorRef,public sanitizer: DomSanitizer,private commandeService:CommandesService,private panierService:PanierService ) {
    this.radioButtons = '1';
    this.checkBox = {
      left: true,
      center: false,
      right: false
    };

    
  }

  ngOnInit():void {
    this.commande = new CommandeData();
    this.getCommandes();
    this.getCategorie();
    this.categorie = new CategoryData();
  this.produit = new ProduitData();
   this.getProduit();


 
  }
  
  
  rechercher(){
    this.produitService.getProduitByCategorie(this.category)
    .subscribe(datas => {
      console.log(datas);
      this.datas=datas;
    },
    err => {
      console.log(err);
    })
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
  getCommandes(){
    this.commandeService.getCommande()
    .subscribe(rest => {
      console.log(rest);
      this.commandes = rest;
      this.changeDetectorRef.detectChanges();
    },
      err => console.log(err)
    )
    
  }
  
  // Add to cart
  public addToCart(product: ProduitData,  quantity: number = 1) {
    this.panierService.addToCart(product,quantity);
  }
  // onOrder() {
  //   this.commandeService.saveOrUpdateCommandes(this.commande).
  //       subscribe(
  //         res => {
  //           this.getCommandes();
  //           console.log(res);
          
  //         },
  //         err => console.log(err)
  //       );
  // }

  

}

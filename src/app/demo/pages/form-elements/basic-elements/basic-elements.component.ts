import { ToastService } from './../../../../theme/shared/components/toast/toast.service';
import { ToastComponent } from './../../../../theme/shared/components/toast/toast.component';
import { FactureService } from './../../../../facture.service';
import { PaiementService } from './../../../../paiement.service';
import { PaiemetData } from './../../../../modele/PaiementData';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { DetailsService } from './../../../../details.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CartItem } from './../../../../modele/PanierData';
import { Observable, of } from 'rxjs';
import { PanierService } from './../../../../panier.service';
import { CustumersService } from './../../../../custumers.service';
import { CustumerData } from './../../../../modele/CustumerData';
import { DetailCommandeData } from './../../../../modele/DetailCommandeData';
import { CommandeData } from './../../../../modele/CommandeData';
import { CommandesService } from './../../../../commandes.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FactureData } from 'src/app/modele/FactureData';
import Swal from 'sweetalert2';


//let products;
@Component({
  selector: 'app-basic-elements',
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.scss']
})
export class BasicElementsComponent implements OnInit {
    commandeFacture:CommandeData;
  commande: CommandeData;
  detailcommande: DetailCommandeData;
  facture:FactureData;
  paiement:PaiemetData;
  reduction: number;
  montantTva:number;
  TotalCommande:number;
  amount:number;
  LivraisonAmount:number=2000;
  clientData: CustumerData;
  clients:any;
  avance= null;
  restant = null;
  showPaiementType= false;
  user:any;
   isConnected: boolean = false;
  public cartItems : Observable<CartItem[]> = of([]);
  @Input() buyProducts: CartItem[] = [];
  avatar = "assets/img/avatars/user.png";
  TypePaiementTab = [{id:1,libelle:"Complet"},{id:2,libelle:"Partiel"}]
  constructor( private custumerService:CustumersService, private panierService:PanierService,
    public sanitizer: DomSanitizer,private spinner: NgxSpinnerService,private commandeService:CommandesService,
    private detail:DetailsService,public toastEvent: ToastService,
    private router:Router, private paimentService:PaiementService, private factureService:FactureService) { 
  }

  ngOnInit() {
    this.facture = new FactureData();
    this.paiement = new PaiemetData();
    this.clientData = new CustumerData();
    this.commande = new CommandeData();
    this.detailcommande = new DetailCommandeData();
   this.user= localStorage.getItem('username');
    this.custumerService.getUserByUsername(this.user).subscribe((data) => {
   this.clientData=data
    console.log('data',this.clientData);
      
});


this.cartItems = this.panierService.getItems();
this.cartItems.subscribe(products => this.buyProducts = products);
this.getTotal().subscribe((amount : number) => this.amount = amount);
this.montantTva = ((this.amount + this.LivraisonAmount)/100)*18;
console.log('tva',this.montantTva)
this.TotalCommande = this.amount + this.LivraisonAmount + this.montantTva;
console.log('total',this.TotalCommande)

console.log('Produits',this.buyProducts)
  
    
  }
  public getTotal(): Observable<number> {
    return this.panierService.getTotalAmount();
  }
  reloadPage() {
    window.location.reload();
  }
  
  typePaiement(pa){
    if(pa == 1){
      this.showPaiementType = false;
      this.avance = null;

    }
    else
    {
      this.showPaiementType = true;
      
    }
  

  }

  /**Cette fonction insertData permet d'insérer
   * une commande avec ses détails et
   * de faire aussi l'update d'une commande
   */
  MakeCommande() {
    this.commandeService.getClientLastCommande(this.clientData.id).subscribe((LastCommande: CommandeData) =>{
      if(LastCommande !=null && LastCommande.montant != LastCommande.avance){
        console.log("Veuillez regler votre commande précédente pour pouvoir passé une nouvelle commande");
        Swal.fire({
          title: 'Veuillez regler votre commande précédente pour pouvoir passé une nouvelle commande.',
          type: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok!',
        });
      }
      else{
        this.spinner.show();
        this.commande.id = null;
        this.commande.user = this.clientData;
        this.commande.dateLivraison = new Date();
        this.commande.montant = this.TotalCommande;
        if (this.avance == null) {
          this.commande.avance = this.commande.montant;
          this.paiement.typePaiement = 'Complet';
          this.paiement.montant = this.TotalCommande;
        } else {
          this.commande.avance = this.avance;
          this.paiement.typePaiement = 'Partiel';
          this.paiement.montant = this.avance;
        }
        this.commande.etat = "En cours";
        console.log("Commande", this.commande);
        this.commandeService.saveOrUpdateCommandes(this.commande)
          .subscribe((commandeCreated: CommandeData) => {
            console.log("CommandeCreated", commandeCreated);
            if (commandeCreated) {
              this.commandeFacture = commandeCreated;
  
              let completedCount = 0;
              for (var i = 0; i < this.buyProducts.length; i++) {
                this.detailcommande.commande = commandeCreated;
                this.detailcommande.produit = this.buyProducts[i].product;
                this.detailcommande.quantite = this.buyProducts[i].quantity;
                console.log("Details", this.detailcommande);
                this.detailcommande.etat = null;
                this.detail.saveOrUpdateDetails(this.detailcommande)
                  .subscribe((DetailCommandeCreated) => {
                    console.log("DetailCommandeCreated", DetailCommandeCreated);
                  });
  
                completedCount += 1;
                if (completedCount === this.buyProducts.length) {
                  console.log("Boucle Complete");
  
                 
                  this.paimentService.saveOrUpdatePaiement(this.paiement)
                        .subscribe((paiementCreated) => {
                          console.log("paiementCreated",paiementCreated);
                          if(paiementCreated){
                             //Creation Facture
                            this.facture.commande = this.commandeFacture;
                            this.facture.date = new Date();
              
                            //this.facture.numero = '1';
                            this.facture.paiement = paiementCreated;
                            console.log("InsertedFacture", this.facture);
                                this.factureService.saveOrUpdateFacture(this.facture)
                            .subscribe((factureCreated) => {
                              console.log("factureCreated",factureCreated);
                              this.spinner.hide();
                              localStorage.removeItem("cartItem"+this.user);
                              // this.reloadPage();
                             // this.router.navigateByUrl('/dashboard/default/basic/button');
                            });
                          }
                        });
                  
                }
              }
            }
          });
      

      }
    });

  }
  // exporter(){
  //   const item = document.getElementById('export');
  //   html2canvas(item).then((canvas) => {
  //     const imgdata = canvas.toDataURL('image/png');
  //     const doc = new jsPDF('p','pt', 'a4');
  //     const imageheight=canvas.height*208/canvas.width;
  //     doc.addImage(imgdata,0,0,208,imageheight);
  //     //doc.output('dataurlnewwindow');
  //     doc.save('listeCommande.pdf');
  //   });
  // }
  

  }



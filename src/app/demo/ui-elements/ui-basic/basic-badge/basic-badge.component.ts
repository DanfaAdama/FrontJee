import { FactureService } from './../../../../facture.service';
import { PaiemetData } from './../../../../modele/PaiementData';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { CustumersService } from './../../../../custumers.service';
import { CommandesService } from './../../../../commandes.service';
import { CommandeData } from './../../../../modele/CommandeData';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { DetailCommandeData } from 'src/app/modele/DetailCommandeData';
import { CustumerData } from 'src/app/modele/CustumerData';
import { ActivatedRoute } from '@angular/router';
import { FactureData } from 'src/app/modele/FactureData';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaiementService } from 'src/app/paiement.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-basic-badge',
  templateUrl: './basic-badge.component.html',
  styleUrls: ['./basic-badge.component.scss']
})
export class BasicBadgeComponent implements OnInit {
  restant = null;
  commandes:CommandeData[];
  commande:CommandeData;
  details:DetailCommandeData[];
  client:CustumerData;
  user:any;
  factures: FactureData[];
  avatar = "assets/img/avatars/user.png";
  modalPayment:any;
  avance= null;
  NewAvance= null;
  TotalAvance = null;
  TotalCommande: number;
  paiement: PaiemetData;
  facture: FactureData;
    constructor(private commandeService:CommandesService, private custumerService:CustumersService,private route: ActivatedRoute,
      public sanitizer: DomSanitizer, private modalService: NgbModal, private spinner:NgxSpinnerService,
     private paiementService:PaiementService, private factureService:FactureService) { }
  
    ngOnInit() {
      this.user= localStorage.getItem('username');
      this.custumerService.getUserByUsername(this.user).subscribe((data) => {
     this.client=data
      console.log('data',this.client);
        
  });
  this.getDetailsCommande();
  this.facture = new FactureData();
  this.paiement = new PaiemetData();
     
    }

    getDetailsCommande(){
      if (this.route.snapshot.paramMap.get("id")){
        this.commandeService.getOnById(this.route.snapshot.paramMap.get("id"))
        .subscribe((commande:CommandeData) => {
          this.commande = commande;
          this.details = this.commande.details_commandes;
          console.log(this.commande);
          this.restant = this.commande.montant - this.commande.avance;
          this.factures = this.commande.factures;
        });
      }
    }

   modalPayements(templates:TemplateRef<any>){
      this.modalPayment = this.modalService.open(templates);
     }

     PayAvance(){
      this.spinner.show();
      this.TotalAvance = this.avance +  Number(this.NewAvance);
      if(this.TotalCommande != this.TotalAvance){
        this.paiement.typePaiement = 'Partiel';
        this.paiement.montant = Number(this.NewAvance);
      }else{
        this.paiement.typePaiement = 'Complet';
        this.paiement.montant =  Number(this.NewAvance);
      }
      console.log("tOTAL AVANCE",this.TotalAvance);
      this.commande.avance = this.TotalAvance;
      console.log("Updating Commande",this.commande);
      this.commandeService.updateAvance(this.commande.id,this.NewAvance)
      .subscribe((commandeUpdated) => {
        console.log("UpdateCommande",commandeUpdated);
        if(commandeUpdated){
          this.paiementService.saveOrUpdatePaiement(this.paiement)
          .subscribe((paiementCreated) => {
            console.log("paiementCreated",paiementCreated);
            if(paiementCreated){
            //Creation Facture
            this.facture.date = new Date();
            this.facture.commande = this.commande;
            //this.facture.numero = '001';
            this.facture.paiement = paiementCreated;
            console.log("InsertedFacture", this.facture);
            this.factureService.saveOrUpdateFacture(this.facture)
            .subscribe((factureCreated) => {
            console.log("factureCreated",factureCreated);
            this.spinner.hide();
            this.getDetailsCommande();
            });
          
          }
        });
        }
      });
    }
  
    sendFactureAvanceByMail(idFacture){
      console.log(idFacture);
      this.spinner.show();
      this.factureService.sendFacture(idFacture)
      .subscribe(message =>{
        console.log(message);
        this.spinner.hide();
        this.AlertFactureSend();
      },
      err => {
        this.spinner.hide();
        this.AlertSendFail();
      });
    }
  
    AlertFactureSend(){
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Facture envoyée avec succès !',
        footer: 'Consultez votre adresse email.',
        showConfirmButton: false,
        timer: 2000
      })
    }
    AlertSendFail() {
      Swal.fire({ title: 'Facture non envoyée vérifier votre connexion internet puis réessayer!!'}).then(result => {
        if (result.value) {
          // handle Confirm button click
          // result.value will contain `true` or the input value
        } else {
          // handle dismissals
          // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
        }
      });
    }


}

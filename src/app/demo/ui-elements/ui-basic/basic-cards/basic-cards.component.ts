import { CustumersService } from './../../../../custumers.service';
import { CommandesService } from './../../../../commandes.service';
import { Component, OnInit } from '@angular/core';
import { CommandeData } from 'src/app/modele/CommandeData';
import { DetailCommandeData } from 'src/app/modele/DetailCommandeData';
import { CustumerData } from 'src/app/modele/CustumerData';
 
@Component({
  selector: 'app-basic-cards',
  templateUrl: './basic-cards.component.html',
  styleUrls: ['./basic-cards.component.scss']
})
export class BasicCardsComponent implements OnInit {
commandes:CommandeData[];
commande:CommandeData;
details:DetailCommandeData;
client:CustumerData;
user:any;
  constructor(private commandeService:CommandesService, private custumerService:CustumersService) { }

  ngOnInit() {
    this.user= localStorage.getItem('username');
    this.custumerService.getUserByUsername(this.user).subscribe((data) => {
   this.client=data
    console.log('data',this.client);
    this.getCommandesbyUser(this.client.id);
      
});
   
  }

  getCommandesbyUser(id){
    this.commandeService.getAllCommandeClient(id).subscribe(
    
    (commandes:CommandeData[])=>{
      this.commandes = commandes;
      console.log('commande',this.commandes);
    }

     );

  }

}

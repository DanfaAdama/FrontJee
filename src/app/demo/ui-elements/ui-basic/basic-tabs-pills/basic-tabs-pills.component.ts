import { CommandesService } from './../../../../commandes.service';
import { CommandeData } from './../../../../modele/CommandeData';
import {Component, OnInit, ViewEncapsulation, ChangeDetectorRef, Input} from '@angular/core';

@Component({
  selector: 'app-basic-tabs-pills',
  templateUrl: './basic-tabs-pills.component.html',
  styleUrls: ['./basic-tabs-pills.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasicTabsPillsComponent implements OnInit {
  @Input() data: CommandeData[] = [];
  commande :CommandeData;
  roles = [];
  constructor(private commandeService:CommandesService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getCommande();
    this.commande = new CommandeData();
    

  }

  getCommande() {
    this.commandeService.getCommande()
      .subscribe(rest => {
        console.log(rest);
        this.data = rest;
        this.changeDetectorRef.detectChanges();
      },
        err => console.log(err)
      )

  }
}

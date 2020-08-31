import { Router } from '@angular/router';
import { PanierService } from './../../../../../panier.service';
import { CartItem } from './../../../../../modele/PanierData';
import {Component, OnInit, Input} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { ProduitData } from 'src/app/modele/ProduitData';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})

export class NavRightComponent implements OnInit {
  @Input() shoppingCartItems: CartItem[] = [];
  constructor(private panierService: PanierService, private router:Router) {
    this.panierService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);

   }

  ngOnInit() { }
  ngAfterViewInit(){
    this.panierService.getItems().subscribe(shoppingCartItems => {
      this.shoppingCartItems = shoppingCartItems;
      console.log('testt', this.shoppingCartItems);

      }
    );
  }

  logout(){
    //localStorage.clear();
      localStorage.removeItem('token');
      localStorage.removeItem('roles');
      localStorage.removeItem('username');
      this.router.navigate(['/auth/signin']);
      setTimeout(() => {
        location.reload();
      }, 300);
      
    }
}

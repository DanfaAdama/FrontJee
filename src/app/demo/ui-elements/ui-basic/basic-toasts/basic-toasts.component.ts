import { Observable, of } from 'rxjs';
import { CartItem } from './../../../../modele/PanierData';
import { PanierService } from './../../../../panier.service';
import { Component, OnInit, Input } from '@angular/core';
import {ToastService} from '../../../../theme/shared/components/toast/toast.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-basic-toasts',
  templateUrl: './basic-toasts.component.html',
  styleUrls: ['./basic-toasts.component.scss']
})
export class BasicToastsComponent implements OnInit {
  avatar = "assets/img/avatars/user.png";
  public cartItems : Observable<CartItem[]> = of([]);
  @Input() shoppingCartItems: CartItem[] = [];
  constructor(private panierService: PanierService,public toastEvent: ToastService,public sanitizer: DomSanitizer) {

   }


  ngOnInit() {
    this.cartItems = this.panierService.getItems();
    this.cartItems.subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
  }

  // Remove cart items
  public removeItem(item: CartItem) {
    this.panierService.removeFromCart(item);
  }


 // Increase Product Quantity
 public increment(product: any, quantity: number = 1) {
  this.panierService.updateCartQuantity(product,quantity);
}

// Decrease Product Quantity
public decrement(product: any, quantity: number = -1) {
  this.panierService.updateCartQuantity(product,quantity);
}

}

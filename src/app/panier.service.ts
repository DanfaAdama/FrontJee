import { CartItem } from './modele/PanierData';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscriber, Observable } from 'rxjs';
import { ProduitData } from './modele/ProduitData';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
// Get product from Localstorage
  let user;

  let products;

@Injectable({
  providedIn: 'root'
})

export class PanierService {
  

  // Array
public cartItems  :  BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
public observer   :  Subscriber<{}>;

  constructor(public snackBar: MatSnackBar ) {
    user = JSON.parse(localStorage.getItem('userConnected'));
    products  = user ? JSON.parse(localStorage.getItem("cartItem"+user.username)) || [] : [];
    this.cartItems.subscribe(
      products => products = products
    );
   }

   

    // Get Products
  public getItems(): Observable<CartItem[]> {
    const itemsStream = new Observable(observer => {
      observer.next(products);
      observer.complete();
    });
    return <Observable<CartItem[]>>itemsStream;
  }

   // Add to cart
   public addToCart(product: ProduitData, quantity: number) {
     let message, status;
     var item: CartItem | boolean = false;
     // If Products exist
     let hasItem = products.find((items, index) => {
       if(items.product.id == product.id) {
         let qty = products[index].quantity + quantity;
         let stock = this.calculateStockCounts(products[index], quantity);
         if(qty != 0 && stock) {
           products[index]['quantity'] = qty;
           message = 'Ce produit ' + product.libelle + ' a été ajouté à vôtre panier.';
           status = 'success';
           this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
         }
         return true;
       }
     } );

     // If Products does not exist (Add New Products)
     if(!hasItem) {
      item = { product: product, quantity: quantity };
      products.push(item);
      message = 'Ce produit ' + product.libelle + ' a été ajouté à vôtre panier.';
      status = 'success';
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }

    console.log(user.username);
     localStorage.setItem("cartItem"+user.username, JSON.stringify(products));
     return item;

   }

   public calculateStockCounts(product: CartItem, quantity): CartItem | Boolean {
    let message, status;
    let qty   = product.quantity + quantity;
    let stock = product.product.quantite;
    if(stock < qty) {
      // this.toastrService.error('You can not add more items than available. In stock '+ stock +' items.');
      this.snackBar.open('You can not choose more items than available. In stock ' + stock + ' items.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      return false
    }
    return true
  }
  
  
  
  
  
  // Removed in cart
  public removeFromCart(item: CartItem) {
    if (item === undefined) return false;
      const index = products.indexOf(item);
      products.splice(index, 1);
      localStorage.setItem("cartItem", JSON.stringify(products));
  }
  
  // Total amount
  public getTotalAmount(): Observable<number> {
   
    let total = 0;
    return this.cartItems.pipe(map((product: any[]) => {
      return products.reduce((prev, curr: any) => {
        if(curr.product.prixNormal != curr.product.prixPromotion){
          total += curr.product.prixPromotion * curr.quantity;
        }else {
          total += curr.product.prixNormal * curr.quantity;
        }
        //return prev + curr.product.prixUnitaire * curr.quantity;
        return total;
      }, 0);
    }));
  }
  
  // Update Cart Value
  public updateCartQuantity(product: ProduitData, quantity: number): CartItem | boolean {
    return products.find((items, index) => {
      if(items.product.id == product.id) {
        let qty = products[index].quantity + quantity;
        let stock = this.calculateStockCounts(products[index], quantity);
        if (qty != 0 && stock)
          products[index]['quantity'] = qty;
        localStorage.setItem("cartItem", JSON.stringify(products));
        return true;
      }
    });
  }

}

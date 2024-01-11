import { Component } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart.service';
import { ProductService } from './product.service';

@Component({
  selector: 'bot-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent {
  products: IProduct[] = [];
  filter: string = '';
  
  constructor(private cartSvc: CartService,
     private productSvc: ProductService) {
    
  }

  ngOnInit(){
    this.productSvc.getProducts().subscribe((products:any) => {
      this.products = products;
    })
  }

  getFilteredProducts() {
    return this.filter === ''
      ? this.products
      : this.products.filter((product: any) => product.category === this.filter)
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
    console.log(`Product '${product.name}' added to cart.`);
  }
}

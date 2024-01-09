import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../catalogue/product.model';

@Component({
  selector: 'bot-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() product!: IProduct;
  @Output() buy = new EventEmitter();

  constructor() {
    
  }

  getImageUrl(imageName: string): string {
    return "/assets/images/robot-parts/" + imageName;
  }

  getDiscountedStyling(discount: number){
    if(discount > 0)
      return { 'color' : 'red' };
    else
      return {};
  }

  getDiscountedClasses(product: IProduct) {
    if(product.discount > 0)
      return 'strikethrough';
    else
      return [];
  }

  buyButtonClicked(product: IProduct) {
    this.buy.emit();
  }
}

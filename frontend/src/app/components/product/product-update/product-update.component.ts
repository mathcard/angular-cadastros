import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  product!: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    const auxId = this.route.snapshot.paramMap.get('id');
    const id = auxId === null ? '0' : auxId;
    this.productService.readById(id).subscribe(( product ) => {
      this.product = product;
    })
  }

  updateProduct(): void {
      this.productService.update(this.product).subscribe(() => {
        this.productService.showMessage('Produto alterado com sucesso!')
        this.router.navigate(['/products'])
    });
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}

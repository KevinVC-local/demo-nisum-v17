import { Component, inject, OnInit, signal } from '@angular/core';
import { AboveNavbarComponent } from "../../components/above-navbar/above-navbar.component";
import { IndexComponent } from "../../components/index/index.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CarouselProductsComponent } from "../../components/carousel-products/carousel-products.component";
import { BrowseStyleComponent } from "../../components/browse-style/browse-style.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ProductService } from '../../services/product.service';
import { ProductPagination } from '../../interfaces/productPagination';
import { extractImageUrl } from '../../../../../core/utils/image-utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboveNavbarComponent, IndexComponent, NavbarComponent, CarouselProductsComponent, BrowseStyleComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly productsServices = inject(ProductService);
  public listNewArrivals = signal<ProductPagination[]>([]);
  public listTopSelling = signal<ProductPagination[]>([]);
  public isLoadingNewArrivals = signal<boolean>(false);
  public isLoadingTopSelling = signal<boolean>(false);
  public isErrorNewArrivals = signal<boolean>(false);
  public isErrorTopSelling = signal<boolean>(false);

  ngOnInit(): void {
    this.getNewArrivals();
    this.getTopSelling();
  }

  getNewArrivals(){
    this.isLoadingNewArrivals.set(true);
    this.listNewArrivals.set([]);
    this.productsServices.getProductsPagination(0, 4).subscribe({
      next: (products) => {
        const productsTransformed = this.transformDataProduct(products);
        this.listNewArrivals.set(productsTransformed);
        this.isLoadingNewArrivals.set(false);
        this.isErrorNewArrivals.set(false);
      },
      error: () => {
        this.isLoadingNewArrivals.set(false);
        this.isErrorNewArrivals.set(true);
      }
    });
  }

  getTopSelling(){
    this.isLoadingTopSelling.set(true);
    this.listTopSelling.set([]);
    this.productsServices.getProductsPagination(4, 4).subscribe({
      next: (products) => {
        const productsTransformed = this.transformDataProduct(products);
        this.listTopSelling.set(productsTransformed);
        this.isLoadingTopSelling.set(false);
        this.isErrorTopSelling.set(false);
      },
      error: () => {
        this.isLoadingTopSelling.set(false);
        this.isErrorTopSelling.set(true);
      }
    });
  }

  transformDataProduct(product: ProductPagination[]){
    return product.map((product) => {
      product.discount = Math.floor(Math.random() * (10 - 15 + 1)) + 10;
      product.rating = Number((Math.random() * (5 - 3) + 3).toFixed(2));
      product.totalPrice = (product.price - product.discount).toFixed(2);
      const arrayImg = product.images.map((img) => extractImageUrl(img));
      product.discountPercentage = ((100 * product.discount) / product.price).toFixed(2);
      product.images = arrayImg;
      return product;
    });
  }

}

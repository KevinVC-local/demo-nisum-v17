import { Component, inject, Input, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmblaCarouselDirective, EmblaCarouselType, EmblaOptionsType } from 'embla-carousel-angular';
import { NoImageDirective } from '../../../../../core/directives/no-image.directive';
import { ProductPagination } from '../../interfaces/productPagination';
import { NgIf } from '@angular/common';
import { SkeletonProductComponent } from "../../../../../common/components/skeleton-product/skeleton-product.component";

@Component({
  selector: 'app-carousel-products',
  standalone: true,
  imports: [EmblaCarouselDirective, NoImageDirective, NgIf, SkeletonProductComponent],
  templateUrl: './carousel-products.component.html',
  styleUrl: './carousel-products.component.scss'
})
export class CarouselProductsComponent {
  @ViewChild(EmblaCarouselDirective) emblaRef: EmblaCarouselDirective | undefined
  private emblaApi?: EmblaCarouselType;
  @Input() title = 'text';
  @Input() products: ProductPagination[] = [];
  @Input() isLoading = false;

  public acountDotSignal = signal<number[]>([])
  public options: EmblaOptionsType = { loop: true, align: 'start' }
  
  public router = inject(Router);

  viewAll(){
    this.router.navigate(['/products']);
  }

  ngAfterViewInit() {
    this.emblaApi = this.emblaRef?.emblaApi;
    this.generateDotButtons();
  }

  generateDotButtons() {
    const acountDot = this.emblaApi?.scrollSnapList().length;
    const dotButtons = Array(acountDot).fill(0);
    this.acountDotSignal.set(dotButtons);
  }


}

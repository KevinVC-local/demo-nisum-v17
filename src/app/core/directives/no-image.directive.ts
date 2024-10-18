import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNoImage]',
  standalone: true
})
export class NoImageDirective {

  @Input() appDefaultImage = './assets/img/no-img.webp';

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('error') onError() {
    this.setDefaultImage();
  }

  @HostListener('load') onLoad() {
    if (!this.el.nativeElement.complete || !this.el.nativeElement.naturalWidth) {
      this.setDefaultImage();
    }
  }

  private setDefaultImage() {
    this.el.nativeElement.src = this.appDefaultImage;
  }

}

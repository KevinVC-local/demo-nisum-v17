import { ElementRef } from "@angular/core";
import { NoImageDirective } from "./no-image.directive";

  describe('NoImageDirective', () => {
    let directive: NoImageDirective;
    let elementRef: ElementRef<HTMLImageElement>;

    beforeEach(() => {
      const imgElement = document.createElement('img');
      elementRef = new ElementRef(imgElement);
      directive = new NoImageDirective(elementRef);
    });

    it('should create an instance', () => {
      expect(directive).toBeTruthy();
    });

  });

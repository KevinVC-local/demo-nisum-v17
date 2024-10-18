import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  public openMenu = signal(false);
  public router = inject(Router);

  toggleNavbar(){
    this.openMenu.set(!this.openMenu());
  }

  goToLogin(){
    this.router.navigate(['/auth/login']);
  }

}

import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { StorageManagerService } from '../../../../../common/services/storage-manager.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, NgFor, NgIf, RouterModule, NgClass],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy{
  mobileQuery: MediaQueryList;
  fillerNav = [
    {name: 'Users', route: '/dashboard/users', icon: 'person'},
    {name: 'Settings', route: '/dashboard/products', icon: 'settings'},
  ];
  public openOptionsUser = signal(false);

  public readonly storageManagerService = inject(StorageManagerService);
  public readonly router = inject(Router);
  public readonly profileService = inject(ProfileService);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.profileService.getDataClient().subscribe({
      next: (data) => {
        this.profileService.setDataClient(data);
      }, 
      error: (error) => {
        console.error(error);
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  handleOpen(){
    this.openOptionsUser.set(!this.openOptionsUser())
  }

  closeSession(){
    this.storageManagerService.removeLocalAndSessionStorage();
    this.router.navigate(['/home']);
  }

}

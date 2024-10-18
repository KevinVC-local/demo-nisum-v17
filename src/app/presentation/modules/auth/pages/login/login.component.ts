import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { StorageManagerService } from '../../../../../common/services/storage-manager.service';
import { ToastComponent } from "../../../../../common/components/toast/toast.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, ToastComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly storageManagerService = inject(StorageManagerService);
  public viewToast = signal<boolean>(false);
  public textToast = signal<string>('The identifier has been saved successfully');
  public typeToast = signal<string>('success');

  ngOnInit(): void {
    this.initForm();
  }

  redirectLogin(){
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.goToLogin();
  }

  setUserDefault(){
    this.loginForm.setValue({
      email: 'john@mail.com',
      password: 'changeme'
    });
  }

  initForm(){
    this.loginForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  get formValid() {
    return this.loginForm.controls;
  }

  getDataForm() {
    return {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
  }

  goToLogin(){
    this.authService.goToLogin(this.getDataForm()).subscribe({
      next: (response) => {
        if (response) {
          this.storageManagerService.set('tokenUser', response);
          this.router.navigate(['/dashboard/users']);
          this.textToast.set('The identifier has been saved successfully');
          this.typeToast.set('success');
          this.viewToast.set(true);
        }
      },
      error: (error) => {
        this.textToast.set('The identifier has not been saved');
        this.typeToast.set('error');
        this.viewToast.set(true);
      },
    });
  }

}

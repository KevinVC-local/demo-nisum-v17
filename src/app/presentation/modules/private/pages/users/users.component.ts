import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../interfaces/dataUser';
import { NoImageDirective } from '../../../../../core/directives/no-image.directive';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { UserList } from '../../interfaces/user';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { ModalConfirmComponent } from '../../components/modal-confirm/modal-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastComponent } from "../../../../../common/components/toast/toast.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NoImageDirective, MatTableModule, FormsModule, MatFormFieldModule, MatInputModule,
    ReactiveFormsModule, MatPaginatorModule, MatButtonModule, ToastComponent, MatProgressSpinnerModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  userForm!: FormGroup;

  private readonly profileService = inject(ProfileService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly dialog = inject(MatDialog);

  public dataUser = signal<User>({} as User);
  displayedColumns: string[] = ['email', 'name', 'role', 'avatar', 'options'];
  userList = signal(new MatTableDataSource<UserList>([]));
  public selectUser = signal<UserList>({} as UserList);
  isLoading = signal<boolean>(false);
  isError = signal<boolean>(false);
  public actionEdit = signal<boolean>(false);
  textButton = signal<string>('Create User');
  public viewToast = signal<boolean>(false);
  public textToast = signal<string>('The User has been saved successfully');
  public typeToast = signal<string>('success');


  ngOnInit(): void {
    this.initForm();
    this.getAllUsers();
    this.profileService.user.subscribe({
      next: (data) => {
        this.dataUser.set(data);
      }, 
      error: (error) => {
        console.error(error);
      }
    });
  }

  ngAfterViewInit() {
    this.userList().paginator = this.paginator;
  }
  
  initForm(){
    this.userForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ]),
      password: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      avatar: new FormControl(null, [Validators.required]),
    });
  }

  get formValid() {
    return this.userForm.controls;
  }

  getAllUsers(){
    this.isLoading.set(true);
    this.userList().data = [];
    this.userService.getAllUser().subscribe({
      next: (data) => {
        this.isLoading.set(false);
        this.isError.set(false);
        this.userList().data = data;
      }, 
      error: (error) => {
        this.isLoading.set(false);
        this.isError.set(true);
      }
    });
  }

  handleEditUser(user: UserList){
    this.selectUser.set(user);
    this.actionEdit.set(true);
    this.textButton.set('Update User');
    this.userForm.setValue({
      email: user.email,
      name: user.name,
      password: user.password,
      avatar: user.avatar
    });
  }

  createUpdateUser(){
    if (!this.userForm.valid) {
      return;
    }
    if (this.actionEdit()) {
      const user = this.userForm.controls['email'].value;
      const objectModal = { title: 'Update User', message: `Are you sure you want to update the user ${user}?` };
      this.openModalConfirm(objectModal, 'update');
    } else {
      const user = this.userForm.controls['email'].value;
      const objectModal = { title: 'Create User', message: `Are you sure you want to create the user ${user}?` };
      this.openModalConfirm(objectModal, 'create');
    }
  }

  openModalConfirm(data: { title: string, message: string }, action: string) {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: { title: data.title, message: data.message },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'create') {
          this.createClient();
        } else {
          this.updateClient();
        }
      }
    });
  }

  cancelEdit(){
    this.textButton.set('Create User');
    this.actionEdit.set(false);
    this.userForm.reset();
    this.selectUser.set({} as UserList);
  }

  getSuccessToast(){
    this.textToast.set('The action has been registered successfully');
    this.typeToast.set('success');
  }

  getErrorToast(){
    this.textToast.set('We have had a problem please try again');
    this.typeToast.set('error');
  }

  createClient(){
    this.userService.createUser(this.userForm.value).subscribe({
      next: (res) => {
        if (res.id) {
          this.getSuccessToast();
          this.getAllUsers();
          this.cancelEdit();
        }
      },
      error: (err) => {
        this.getErrorToast();
      }
    });
  }

  updateClient(){
    const dataUpdate = {
      email: this.userForm.controls['email'].value,
      name: this.userForm.controls['name'].value,
    }
    this.userService.updateUser(dataUpdate, this.selectUser().id ).subscribe({
      next: (res) => {
        if (res.id) {
          this.getSuccessToast();
          this.getAllUsers();
          this.cancelEdit();
        }
      },
      error: (err) => {
        this.getErrorToast();
      }
    });
  }

}

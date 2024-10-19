import { Component, inject, signal, ViewChild } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../interfaces/dataUser';
import { ToastComponent } from "../../../../../common/components/toast/toast.component";
import { NoImageDirective } from '../../../../../core/directives/no-image.directive';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CategoryList } from '../../interfaces/category';
import { ModalConfirmComponent } from '../../components/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NoImageDirective, MatTableModule, FormsModule, MatFormFieldModule, MatInputModule,
    ReactiveFormsModule, MatPaginatorModule, MatButtonModule, ToastComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  categoryForm!: FormGroup;

  private readonly profileService = inject(ProfileService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly categoryService = inject(CategoryService);
  private readonly dialog = inject(MatDialog);

  public actionEdit = signal<boolean>(false);
  textButton = signal<string>('Create Category');

  displayedColumns: string[] = ['name', 'image', 'options'];
  categoryList = signal(new MatTableDataSource<CategoryList>([]));
  public selectCategory = signal<CategoryList>({} as CategoryList);
  isLoading = signal<boolean>(false);
  isError = signal<boolean>(false);

  // data toast
  public viewToast = signal<boolean>(false);
  public textToast = signal<string>('The User has been saved successfully');
  public typeToast = signal<string>('success');
  

  public dataUser = signal<User>({} as User);

  ngOnInit(): void {
    this.initForm();
    this.getAllCategories();
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
    this.categoryList().paginator = this.paginator;
  }
  
  initForm(){
    this.categoryForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
    });
  }

  get formValid() {
    return this.categoryForm.controls;
  }

  getAllCategories(){
    this.isLoading.set(true);
    this.categoryList().data = [];
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.isLoading.set(false);
        this.isError.set(false);
        this.categoryList().data = data;
      }, 
      error: (error) => {
        this.isLoading.set(false);
        this.isError.set(true);
      }
    });
  }

  handleEditCategory(category: CategoryList){
    this.selectCategory.set(category);
    this.actionEdit.set(true);
    this.textButton.set('Update category');
    this.categoryForm.setValue({
      name: category.name,
      image: category.image
    });
  }

  handleDeleteCategory(category: CategoryList){
    this.selectCategory.set(category);
    const objectModal = { title: 'Delete Category', message: `Are you sure you want to delete the category ${category.name}?` };
    this.openModalConfirm(objectModal, 'delete');
  }


  createUpdateCategory(){
    if (!this.categoryForm.valid) {
      return;
    }
    if (this.actionEdit()) {
      const category = this.categoryForm.controls['name'].value;
      const objectModal = { title: 'Update Category', message: `Are you sure you want to update the category ${category}?` };
      this.openModalConfirm(objectModal, 'update');
    } else {
      const category = this.categoryForm.controls['name'].value;
      const objectModal = { title: 'Create Category', message: `Are you sure you want to create the category ${category}?` };
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
          this.createCategory();
        } else if (action === 'delete') {
          this.deleteCategory();
        } else {
          this.updateCategory();
        }
      }
    });
  }

  cancelEdit(){
    this.textButton.set('Create category');
    this.actionEdit.set(false);
    this.categoryForm.reset();
    this.selectCategory.set({} as CategoryList);
  }

  createCategory(){
    this.isLoading.set(true);
    this.categoryService.createCategory(this.categoryForm.value).subscribe({
      next: (data) => {
        this.isLoading.set(false);
        this.viewToast.set(true);
        this.textToast.set('The Category has been saved successfully');
        this.typeToast.set('success');
        this.getAllCategories();
        this.cancelEdit();
      }, 
      error: (error) => {
        this.isLoading.set(false);
        this.viewToast.set(true);
        this.textToast.set('The Category has not been saved successfully');
        this.typeToast.set('error');
      }
    });
  }

  updateCategory(){
    this.isLoading.set(true);
    this.categoryService.updateCategory(this.categoryForm.value, this.selectCategory().id).subscribe({
      next: (data) => {
        this.isLoading.set(false);
        this.viewToast.set(true);
        this.textToast.set('The Category has been updated successfully');
        this.typeToast.set('success');
        this.getAllCategories();
        this.cancelEdit();
      }, 
      error: (error) => {
        this.isLoading.set(false);
        this.viewToast.set(true);
        this.textToast.set('The Category has not been updated successfully');
        this.typeToast.set('error');
      }
    });
  }

  deleteCategory(){
    this.isLoading.set(true);
    this.categoryService.deleteCategory(this.selectCategory().id).subscribe({
      next: (data) => {
        this.isLoading.set(false);
        this.viewToast.set(true);
        this.textToast.set('The Category has been deleted successfully');
        this.typeToast.set('success');
        this.getAllCategories();
        this.cancelEdit();
      }, 
      error: (error) => {
        this.isLoading.set(false);
        this.viewToast.set(true);
        this.textToast.set('The Category has not been deleted successfully');
        this.typeToast.set('error');
      }
    });
  }


}

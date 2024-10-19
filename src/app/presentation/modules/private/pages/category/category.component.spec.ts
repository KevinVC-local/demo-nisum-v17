import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {

    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

    dialogRefMock.afterClosed.and.returnValue(of(true));
    dialogSpy.open.and.returnValue(dialogRefMock);

    await TestBed.configureTestingModule({
      imports: [CategoryComponent, HttpClientTestingModule, BrowserAnimationsModule, MatPaginatorModule],
      providers: [{ provide: MatDialog, useValue: dialogSpy }],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call initForm', () => {
      const initFormSpy = spyOn(component, 'initForm');
      component.ngOnInit();
      expect(initFormSpy).toHaveBeenCalled();
    });

    it('should call getAllCategories', () => {
      const getAllCategoriesSpy = spyOn(component, 'getAllCategories');
      component.ngOnInit();
      expect(getAllCategoriesSpy).toHaveBeenCalled();
    });

    it('should subscribe to profileService.user', () => {
      const profileServiceUserSpy = spyOn(component['profileService'].user, 'subscribe');
      component.ngOnInit();
      expect(profileServiceUserSpy).toHaveBeenCalled()
    });
  });

  describe('ngAfterViewInit', () => {
    it('should assign paginator to dataSource', () => {
      expect(component.categoryList().paginator).toBe(component.paginator); // Verifica la asignación
    });
  });

  describe('initForm', () => {
    it('should initialize categoryForm', () => {
      component.initForm();
      expect(component.categoryForm).toBeDefined();
    });
  });

  describe('getAllCategories', () => {
    it('should call categoryService.getAllCategories', () => {
      component['categoryService'].getAllCategories = jasmine.createSpy().and.returnValue(of([]));
      component.getAllCategories();
      spyOn(component, 'getAllCategories').and.callThrough();
    });
  });

  describe('handleEditCategory', () => {
    it('should set selectCategory', () => {
      const category = { id: 1, name: 'test', image: 'test' };
      component.handleEditCategory(category);
      expect(component.selectCategory()).toEqual(category);
    });

    it('should set actionEdit', () => {
      component.handleEditCategory({ id: 1, name: 'test', image: 'test' });
      expect(component.actionEdit()).toBeTrue();
    });

    it('should set textButton', () => {
      component.handleEditCategory({ name: 'test', image: 'test', id: 1 });
      expect(component.textButton()).toBe('Update category');
    });

    it('should set categoryForm value', () => {
      const category = { name: 'test', image: 'test', id: 1 };
      component.categoryForm.setValue({ name: 'test', image: 'test' });
      component.handleEditCategory(category);
      expect(component.categoryForm.value).toEqual({ name: 'test', image: 'test'});
    });
  });

  describe('handleDeleteCategory', () => {
    it('should set selectCategory', () => {
      const category = { id: 1, name: 'test', image: 'test' };
      component.handleDeleteCategory(category);
      expect(component.selectCategory()).toEqual(category);
    });
  });

  describe('createUpdateCategory', () => {
    it('should return if categoryForm is invalid', () => {
      component.categoryForm.setErrors({ invalid: true });
      const categoryServiceSpy = spyOn(component['categoryService'], 'createCategory');
      component.createUpdateCategory();
      expect(categoryServiceSpy).not.toHaveBeenCalled();
    });

    it('should call categoryService.createCategory if actionEdit is false', () => {
      const category = { id: 1, name: 'test', image: 'test' };
      component.categoryForm.setValue({ name: 'test', image: 'test' });
      const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
      dialogRefSpy.afterClosed.and.returnValue(of(true));
      dialogSpy.open.and.returnValue(dialogRefSpy);
      component.actionEdit.set(false);
      const categoryServiceSpy = spyOn(component['categoryService'], 'createCategory').and.returnValue(of(category));
      component.createUpdateCategory();
      expect(categoryServiceSpy).toHaveBeenCalled();
    });

    it('should call categoryService.updateCategory if actionEdit is true', () => {
      const category = { id: 1, name: 'test', image: 'test' };
      component.categoryForm.setValue({ name: 'test', image: 'test' });
      component.actionEdit.set(true);
      const categoryServiceSpy = spyOn(component['categoryService'], 'updateCategory').and.returnValue(of(category));
      component.createUpdateCategory();
      expect(categoryServiceSpy).toHaveBeenCalled();
    });
  });

  describe('cancelEdit', () => {
    it('should reset categoryForm', () => {
      component.categoryForm.setValue({ name: 'test', image: 'test' });
      component.cancelEdit();
      expect(component.categoryForm.value).toEqual({ name: null, image: null });
    });

    it('should set actionEdit to false', () => {
      component.actionEdit.set(true);
      component.cancelEdit();
      expect(component.actionEdit()).toBeFalse();
    });

    it('should set textButton to Create category', () => {
      component.textButton.set('Update category');
      component.cancelEdit();
      expect(component.textButton()).toBe('Create category');
    });
  });

  describe('createCategory', () => {
    it('should call categoryService.createCategory', () => {
      const category = { id: 1, name: 'test', image: 'test' };
      component.categoryForm.setValue({ name: 'test', image: 'test' });
      const categoryServiceSpy = spyOn(component['categoryService'], 'createCategory').and.returnValue(of(category));
      component.createCategory();
      expect(categoryServiceSpy).toHaveBeenCalled();
    });
    it('should call categoryService.createCategory error', () => {
      component.categoryForm.setValue({ name: 'test', image: 'test' });
      const categoryServiceSpy = spyOn(component['categoryService'], 'createCategory').and.returnValue(throwError( () => new Error('Error')));
      component.createCategory();
      expect(categoryServiceSpy).toHaveBeenCalled();
    });
  });

  describe('updateCategory', () => {
    it('should call categoryService.updateCategory', () => {
      const category = { id: 1, name: 'test', image: 'test' };
      component.categoryForm.setValue({ name: 'test', image: 'test' });
      const categoryServiceSpy = spyOn(component['categoryService'], 'updateCategory').and.returnValue(of(category));
      component.updateCategory();
      expect(categoryServiceSpy).toHaveBeenCalled();
    });
    it('should call categoryService.updateCategory error', () => {
      component.categoryForm.setValue({ name: 'test', image: 'test' });
      const categoryServiceSpy = spyOn(component['categoryService'], 'updateCategory').and.returnValue(throwError( () => new Error('Error')));
      component.updateCategory();
      expect(categoryServiceSpy).toHaveBeenCalled();
    });

  });
});

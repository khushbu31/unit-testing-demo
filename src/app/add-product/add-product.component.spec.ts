import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let dialogRef: MatDialogRef<AddProductComponent>;
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
  let mockProductService = jasmine.createSpyObj('ProductsService', ['updateProduct', 'saveProduct']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [AddProductComponent],
      providers: [
        { provide: ProductsService, useValue: mockProductService},
        { provide: MatSnackBar, useValue: matSnackBar},
        { provide: MatDialogRef, useValue: jasmine.createSpyObj('MatDialogRef', ['close', 'open']) },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;

    mockProductService = TestBed.inject(ProductsService);
    dialogRef = TestBed.inject(MatDialogRef);
    matSnackBar = TestBed.inject(MatSnackBar);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init the form', () => {
    expect(component.productForm).toBeDefined();
    expect(component.productForm.value).toEqual({
          title: '',
          description: '',
          price: '',
          category: ''
    })
  });

  describe('should test add product functionality', () => {
    it('should call the saveProduct to add new product', () => {
      const data: Product = {
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category'
      };
      const response: Product = {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category'
      };
      component.productForm.setValue(data);
      mockProductService.saveProduct.and.returnValue(of(response));
      component.saveProduct();
      expect(mockProductService.saveProduct).toHaveBeenCalledWith(data);
      expect(matSnackBar.open).toHaveBeenCalledWith('Added Successfully!...', '', {
        duration: 3000
      });
      expect(dialogRef.close).toHaveBeenCalled();
    });

    it('should test the saveProduct for failure while add a new product', () => {
      const data: Product = {
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category'
      };
      const error = new Error('Error while add a new product');
      mockProductService.saveProduct.and.returnValue((throwError(() => error)));
      component.productForm.setValue(data);
      component.saveProduct();
      expect(mockProductService.saveProduct).toHaveBeenCalledWith(data);
      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {
        duration: 3000
      });
    });
  })

  describe('should test edit product functionality', () => {
    it('should set the form controls to the correct values when data is provided', () => {
      const data: Product = {
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category'
      };
      component.data = data;
      component.ngOnInit();
      expect(component.productForm.value).toEqual(data);
    });

    it('should call the saveProduct while editing the product', () => {
      const data: Product = {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category'
      };
      const response: Product = {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category'
      };

      component.data = data;
      mockProductService.updateProduct.and.returnValue(of(response));
      component.productForm.patchValue(data);

      component.saveProduct();

      expect(mockProductService.updateProduct).toHaveBeenCalledWith(data);
      expect(matSnackBar.open).toHaveBeenCalledWith('Updated Successfully!...', '', {
        duration: 3000
      });
      expect(dialogRef.close).toHaveBeenCalled();
    });

    it('should test the saveProduct for failure while update a product', () => {
      const data: Product = {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category'
      };
      const error = new Error('Error while update a product');
      component.data = data;

      mockProductService.updateProduct.and.returnValue((throwError(() => error)));
      component.productForm.patchValue(data);
      component.saveProduct();
      expect(mockProductService.updateProduct).toHaveBeenCalledWith(data);
      expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {
        duration: 3000
      });
    });
  });

});

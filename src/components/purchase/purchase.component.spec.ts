import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InventoryService } from 'src/Service/Inventoryservice';

import { PurchaseComponent } from './purchase.component';

describe('PurchaseComponent', () => {
  let component: PurchaseComponent;
  let fixture: ComponentFixture<PurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [PurchaseComponent],
      providers: [InventoryService]  
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a FormGroup comprised of FormControls', () => {
    component.ngOnInit();
    expect(component.myform instanceof FormGroup).toBe(true);
  });

  it('form invalid when empty', () => {
    expect(component.myform.valid).toBeFalsy();
  });

  it('Quantity invalid when empty', () => {
    let qty = component.myform.controls['userRequestedQty'];
    expect(qty.valid).toBeFalsy();

    let errors = {};
    errors = qty.errors;
    expect(errors['required']).toBeTruthy();
  });
  it('Cash invalid when empty', () => {
    let cash = component.myform.controls['userProvidedCash'];
    expect(cash.valid).toBeFalsy();
    let errors = {};
    errors = cash.errors;
    expect(errors['required']).toBeTruthy();
  });

  it('Quantity field invalid value', () => {
    let qty = component.myform.controls['userRequestedQty'];
    expect(qty.valid).toBeFalsy();
    qty.setValue('invalid text');
    let errors = {};
    errors = qty.errors;
    expect(errors).toBeTruthy();
  });

  it('Quantity field valid value', () => {
    let qty = component.myform.controls['userRequestedQty'];
    expect(qty.valid).toBeFalsy();
    qty.setValue(1);
    let errors = {};
    errors = qty.errors;
    expect(errors).toBeNull();
  });

  it('Cash field invalid value', () => {
    let cash = component.myform.controls['userProvidedCash'];
    expect(cash.valid).toBeFalsy();
    cash.setValue('invalid text');
    let errors = {};
    errors = cash.errors;
    expect(errors).toBeTruthy();
  });

  it('Cash field valid value', () => {
    let cash = component.myform.controls['userProvidedCash'];
    expect(cash.valid).toBeFalsy();
    cash.setValue(1);
    let errors = {};
    errors = cash.errors;
    expect(errors).toBeNull();
  });

  it('Test Case 1: Quantity is 1 and cash is $2', () => {
    expect(component.myform.valid).toBeFalsy();
    component.myform.controls['userRequestedQty'].setValue('1');
    component.myform.controls['userProvidedCash'].setValue('2');
    expect(component.myform.valid).toBeTruthy();

    // Trigger the acceptUserInput function
    component.acceptUserInput();

    // Now we can check to make sure the emitted value is correct
    //total price should be 1 * 1.20
    expect(component.totalCash).toBe(1.2);
    //balance should be 2-1.20 = .80
    expect(component.balance).toBe(0.8);
    expect(component.successMessage).toBe(
      'Returning 1 can with balance of $0.80'
    );
  });

  it('Test Case 2: Quantity is 1 and cash is $1', () => {
    expect(component.myform.valid).toBeFalsy();
    component.myform.controls['userRequestedQty'].setValue('1');
    component.myform.controls['userProvidedCash'].setValue('1');
    expect(component.myform.valid).toBeTruthy();

    // Trigger the acceptUserInput function
    component.acceptUserInput();

    // Now we can check to make sure the emitted value is correct
    //total price should be 1 * 1.20 and cash is only $1
    expect(component.totalCash).toBe(1.2);
    expect(component.errorExist).toBeTrue();
    expect(component.errorMessage).toBe('Insufficient money');
  });

  it('Test Case 3: Quantity is 1 and cash is $1.5', () => {
    expect(component.myform.valid).toBeFalsy();
    component.myform.controls['userRequestedQty'].setValue(1);
    component.myform.controls['userProvidedCash'].setValue(1.5);
    expect(component.myform.valid).toBeTruthy();
    component.setStock(0);
    // Trigger the acceptUserInput function
    component.acceptUserInput();
    // Now we can check to make sure the emitted value is correct
    //total price should be 1 * 1.20 and cash is only $1
    expect(component.totalCash).toBe(1.2);
    expect(component.errorExist).toBeTrue();
    expect(component.errorMessage).toBe(
      'Out of Stock! Please Resupply by clicking on Resupply button after entering the Resupply quantity.'
    );
  });

  it('Test Case 5: Input: Purchase 3 cans with $5.00', () => {
    expect(component.myform.valid).toBeFalsy();
    component.myform.controls['userRequestedQty'].setValue(3);
    component.myform.controls['userProvidedCash'].setValue(5);
    expect(component.myform.valid).toBeTruthy();
    component.setStock(10);
    // Trigger the acceptUserInput function
    component.acceptUserInput();
    // Now we can check to make sure the emitted value is correct
    //total price should be 3 * 1.20 = 3.60 and balance is only $1

    expect(component.errorExist).toBeFalse();
    expect(component.successMessage).toBe(
      'Returning 3 can with balance of $1.40'
    );
  });
});

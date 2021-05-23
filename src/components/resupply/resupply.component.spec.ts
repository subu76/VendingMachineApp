import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryService } from 'src/Service/Inventoryservice';

import { ResupplyComponent } from './resupply.component';

describe('ResupplyComponent', () => {
  let component: ResupplyComponent;
  let fixture: ComponentFixture<ResupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [ResupplyComponent],
      providers: [InventoryService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResupplyComponent);
    component = fixture.componentInstance;
    //let inventoryService = fixture.debugElement.injector.get(InventoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a FormGroup comprised of FormControls', () => {
    component.ngOnInit();
    expect(component.myform instanceof FormGroup).toBe(true);
  });


  it('Resupply Quantity field valid value', () => {
    let qty = component.myform.controls['resuppliedQty'];
    expect(qty.valid).toBeTruthy();
    qty.setValue(1);
    let errors = {};
    errors = qty.errors;
    expect(errors).toBeNull();
  });

  it('Test Case 4: Resupply with 10 cans', () => {
    expect(component.myform.valid).toBeTruthy();
    component.myform.controls['resuppliedQty'].setValue(10);
    expect(component.myform.valid).toBeTruthy();
    component.setStock(0);

    // Trigger the reSupplyCans function
    component.reSupplyCans();
    // Now we can check to verify the stock is resupplied to 10 cans
    expect(component.stockInventory).toBe(10);
  });
});

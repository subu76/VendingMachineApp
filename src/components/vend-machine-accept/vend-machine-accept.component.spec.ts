import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryService } from 'src/Service/Inventoryservice';

import { VendMachineAcceptComponent } from './vend-machine-accept.component';

describe('VendMachineAcceptComponent', () => {
  let component: VendMachineAcceptComponent;
  let fixture: ComponentFixture<VendMachineAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendMachineAcceptComponent ],
      providers: [InventoryService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendMachineAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/Service/Inventoryservice';
import { AppConstants } from 'src/app/common/appconstants';

@Component({
  selector: 'app-resupply',
  templateUrl: './resupply.component.html',
  styleUrls: ['./resupply.component.sass'],
})
export class ResupplyComponent implements OnInit {
  @Output() newStockValue = new EventEmitter<number>();

  errorExist: boolean = false;
  errorMessage: string = '';
  successMessage = '';
  stockInventory: number = 0;
  resuppliedQty: number = 0;
  myform: FormGroup;

  constructor(private invService: InventoryService) {}

  ngOnInit(): void {
    this.stockInventory = this.invService.getStock();

    this.myform = new FormGroup({
      resuppliedQty: new FormControl(null, [Validators.required]),
    });
  }

  reSupplyCans() {
    this.stockInventory = this.invService.getStock();
    if (this.resuppliedQty === null || this.resuppliedQty <= 0) {
      this.errorExist = true;
      this.errorMessage = AppConstants.RESUPPLY_QTY_ERR_MSG;
      return false;
    }

    this.invService.Resupply(this.resuppliedQty);
    this.stockInventory = this.invService.getStock();

    this.newStockValue.emit(this.stockInventory);
    this.successMessage = ' Resupplied with ' + this.resuppliedQty + ' cans';
    this.errorExist = false;
  }

  ResetStock() {
    this.stockInventory = this.invService.resetStock();
    this.newStockValue.emit(this.stockInventory);
  }

  setStock(currentStock: number) {
    this.invService.setStock(currentStock);
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/Service/Inventoryservice';
import { AppConstants } from 'src/app/common/appconstants';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.sass'],
})
export class PurchaseComponent implements OnInit {
  @Output() newStockValue = new EventEmitter<number>();

  constructor(private invService: InventoryService) {}

  userRequestedQty: number;
  userProvidedCash: number;
  balance: number = 0.0;
  errorExist: boolean = false;
  errorMessage: string = '';
  totalCash = 0.0;
  successMessage = '';
  stockInventory: number = 0;
  tempStock = 0;
  myform: FormGroup;

  ngOnInit(): void {
    this.stockInventory = this.invService.getStock();
    this.myform = new FormGroup({
      userRequestedQty: new FormControl(null, [Validators.required]),
      userProvidedCash: new FormControl(null, [Validators.required]),
    });
  }

  acceptUserInput() {
    this.stockInventory = this.invService.getStock();

    if (!this.validateInput()) {
      return;
    }
    this.totalCash = this.userRequestedQty * AppConstants.CAN_COST;

    if (this.userProvidedCash < this.totalCash) {
      this.errorExist = true;
      this.errorMessage = AppConstants.INSUFF_MONEY_ERR_MSG;
    } else if (this.userRequestedQty > this.stockInventory) {
      this.errorExist = true;
      this.errorMessage = AppConstants.OUT_OF_STCK_ERR_MSG;
    } else {
      this.errorExist = false;
      this.balance = this.userProvidedCash - this.totalCash;
      this.stockInventory = this.invService.reduceStock(this.userRequestedQty);

      this.newStockValue.emit(this.stockInventory);

      this.successMessage =
        'Returning ' +
        this.userRequestedQty +
        ' can with balance of $' +
        this.balance.toFixed(2);
    }
  }

  validateInput() {
    if (this.userRequestedQty === null || this.userRequestedQty <= 0) {
      this.errorExist = true;
      this.errorMessage = AppConstants.INVALID_USER_REQ_QTY_ERR_MSG;
      return false;
    }
    if (this.userProvidedCash === null || this.userProvidedCash <= 0) {
      this.errorExist = true;
      this.errorMessage = AppConstants.INVALID_CASH_AMT_ERR_MSG;
      return false;
    }
    return true;
  }

  getTempStock() {
    this.tempStock = this.stockInventory;
  }

  setStock(currentStock: number) {
    this.invService.setStock(currentStock);
  }

  ResetTransactions() {}
}

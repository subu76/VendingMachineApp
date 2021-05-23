import { Injectable } from '@angular/core';

export class InventoryService {
  constructor() {}
  Inventory: number = 1;
  public Resupply(resuppliedcans: number) {
    this.Inventory += resuppliedcans;
  }
  public getStock(): number {
    return this.Inventory;
  }
  public reduceStock(noOfCans: number): number {
    this.Inventory -= noOfCans;
    return this.Inventory;
  }
  public resetStock(): number {
    this.Inventory = 1;
    return this.Inventory;
  }

  public setStock(currStock: number) {
    this.Inventory = currStock;
  }
}

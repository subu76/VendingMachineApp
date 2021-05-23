import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from 'src/Service/Inventoryservice';
@Component({
  selector: 'app-vend-machine-accept',
  templateUrl: './vend-machine-accept.component.html',
  styleUrls: ['./vend-machine-accept.component.sass']
  })
export class VendMachineAcceptComponent implements OnInit {
  currentStock: number = 0;

  constructor(private invService: InventoryService) {}

  ngOnInit(): void {
    this.currentStock = this.invService.getStock();
  }

  updateStock(curStock: number) {
    this.currentStock = curStock;
  }
}

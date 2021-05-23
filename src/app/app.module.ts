import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendMachineAcceptComponent } from '../components/vend-machine-accept/vend-machine-accept.component';
import { PurchaseComponent } from '../components/purchase/purchase.component';
import { ResupplyComponent } from '../components/resupply/resupply.component';
import { InventoryService } from '../Service/Inventoryservice';

@NgModule({
  declarations: [
    AppComponent,

    VendMachineAcceptComponent,

    PurchaseComponent,

    ResupplyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [InventoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component } from '@angular/core';
import { InventoryService } from 'src/Service/Inventoryservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'VendingMachineApp';

  errorMessage = '';
  successMessage = '';
}

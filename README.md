# VendingMachineApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

In order to start using the application:

git clone --depth 1 https://github.com/subu76/VendingMachineApp.git
cd VendingMachineApp
# install the project's dependencies
npm install
# watches your files and uses livereload by default
ng serve or npm start

# Running tests
ng test

State Management
-----------------
 The state management can be implemented by using a shared service having a shared state/data. I have used InventoryService for storing the current inventory stock.
 State can be managed through component’s interaction via input bindings and output event emitters. The child components Purchase and Resupply will emit the stock balance as @Output customs events to the parent Vendor-Machine-Accept component.
 We can use other libraries like RxJs for managing the state but the shared service approach will be enough for a simple application like this.

 SASS Styling
 ------------------------------------
 For SASS styling, I have used bootstrap sass which is in "../node_modules/bootstrap/scss/bootstrap.scss"

Run the below command in the project root directory.
npm install --save bootstrap
Now add Bootstrap to the angular.json config inside the styles array (before any other custom css/scss files in order to let them override bootstrap rules :

"styles": [
  "node_modules/bootstrap/scss/bootstrap.scss",
  /* ... */
],

-----------------------------------------------------------------------
How to use the web application ?
------------------------------------------------------------------------
1) Access the application via http://localhost:4200/

2) Enter the quanity (no of cans) and Cash and click on purchase button.
Appropriate message will be displayed. Please note that the initial stock is 1.

3) Resuppling of cans can be done by entering the no of cans to be resupplied in the Resupply Quantity input field and clicking on the Resupply button.

4) Reset Stock button will reinitialize the stock inventory to 1.




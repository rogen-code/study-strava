import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BudgetDataService } from './shared/budget-data.service';
import { LeftoverMoneyComponent } from './leftover-money/leftover-money.component';
import { TransactionComponent } from './transaction/transaction.component'

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LeftoverMoneyComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    BudgetDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

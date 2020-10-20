import { Component, OnInit } from '@angular/core';
import { BudgetDataService } from '../shared/budget-data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  constructor(
    private budgetDataService: BudgetDataService,
  ) {

  }
  moneyLeft = 1200

  countMoney() {
    this.moneyLeft = 1200 - this.budgetDataService.sum()
  }


  transactions = null
  categories = null

  purchasedItem = null;
  cost = 0;
  category = null;

  onSubmit(customerData) {
    customerData.preventDefault()
    this.budgetDataService.addPurchase(this.category, this.cost, this.purchasedItem)
    this.purchasedItem = null;
    this.cost = 0;
    this.category = null;
    this.countMoney()
  }






  ngOnInit(): void {
    this.transactions = this.budgetDataService.get()
    this.categories = this.budgetDataService.getCategories()
    this.countMoney()
  }

}

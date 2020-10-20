import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetDataService {

  private transactions = [
    {
      id: 1,
      category: 'food',
      cost: 40,
      name: 'Spent Money At The Store'
    },
    {
      id: 2,
      category: 'sports',
      cost: 40,
      name: 'Spent Money At The Movies'
    },
    {
      id: 3,
      category: 'soda',
      cost: 40,
      name: 'Spent Money At The Bar'
    },
    {
      id: 4,
      category: 'music',
      cost: 40,
      name: 'Spent Money At The House'
    }
  ]

  addPurchase(category, cost, name) {
    const transaction = {
      id: this.transactions.length,
      category,
      cost,
      name,
    }
    this.transactions.push(transaction)
  }

  sum() {
    let sum = 0;
    this.transactions.forEach((transaction) => {
      sum += transaction.cost
    })
    return sum;
  }

  get(){
    return this.transactions
  }

  getCategories() {
    return ['music','sports','soda','fun']
  }

  constructor() { }
}

import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { BudgetDataService } from '../shared/budget-data.service'

@Component({
  selector: 'app-leftover-money',
  templateUrl: './leftover-money.component.html',
  styleUrls: ['./leftover-money.component.css']
})
export class LeftoverMoneyComponent implements OnInit {

  constructor(private budgetDataService: BudgetDataService) { }

  moneyLeft = 1200

  countMoney() {
    this.moneyLeft = 1200 - this.budgetDataService.sum()
  }

  ngOnInit(): void {
    this.countMoney()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.moneyLeft = 1200 - this.budgetDataService.sum()
    console.log('firing')
  }



}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftoverMoneyComponent } from './leftover-money.component';

describe('LeftoverMoneyComponent', () => {
  let component: LeftoverMoneyComponent;
  let fixture: ComponentFixture<LeftoverMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftoverMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftoverMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

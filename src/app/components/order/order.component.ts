import {Component, OnInit} from '@angular/core';
import {CoinService} from '../../core/services/coin.service';
import {Coin, Coins} from '../../core/model/coin';

@Component({
  selector: 'app-order',
  imports: [],
  providers: [
    CoinService,
  ],
  templateUrl: './order.component.html',
  standalone: true,
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  coins: Coin[] = [];

  constructor(
    private coinService: CoinService,
  ) {
  }

  ngOnInit(): void {
    this.getCoins();
  }

  getCoins() {
    this.coinService.getCoins().subscribe({
      next: (data) => {
        this.coins = data as Coins;
      }, error: (err) => {
      }
    });
  }

}

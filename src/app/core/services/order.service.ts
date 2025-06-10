import Swal from 'sweetalert2';
import {effect, Injectable, Signal, signal} from '@angular/core';
import {Coin} from '../model/coin';
import {Order} from '../model/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderSignal = signal<Order | null>(null);
  private coinsSignal = signal<Coin[] | null>(null);

  constructor() {
    effect(() => {
    });
  }

  updateCoins(coins: Coin[]) {
    localStorage.setItem('coins', JSON.stringify(coins));
    this.coinsSignal.set(coins);
  }

  getCoinsSignal(): Signal<Coin[] | null> {
    return this.coinsSignal;
  }

  updateOrder(order: Order) {
    localStorage.setItem('order', JSON.stringify(order));
    this.orderSignal.set(order);
  }

  getOrderSignal(): Signal<Order | null> {
    return this.orderSignal;
  }

}

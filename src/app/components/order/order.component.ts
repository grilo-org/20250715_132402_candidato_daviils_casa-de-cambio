import {Component, computed, OnInit} from '@angular/core';
import {CoinService} from '../../core/services/coin.service';
import {Coin, Coins} from '../../core/model/coin';
import {NgClass, NgForOf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {AlertService} from '../../core/services/alert.service';
import {OrderService} from '../../core/services/order.service';
import {Router, RouterLink} from '@angular/router';
import {Items, Order} from '../../core/model/order';

@Component({
  selector: 'app-order',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgClass,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    CoinService,
  ],
  templateUrl: './order.component.html',
  standalone: true,
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
  })

  coins: Coin[] = [];
  items: Items[] = [];
  orders: Order = new Order();
  indexOrder = 0;

  constructor(
    private router: Router,
    private coinService: CoinService,
    private alertService: AlertService,
    private orderService: OrderService,
  ) {
  }

  ngOnInit(): void {
    const coins = computed(() => this.orderService.getCoinsSignal()());
    if (coins() != null) {
      this.coins = coins()!;
      this.completeItens();
    } else {
      this.getCoins();
    }
  }

  getCoins() {
    this.coinService.getCoins().subscribe({
      next: (data) => {
        this.coins = data as Coins;
        this.orderService.updateCoins(this.coins);
        const order = computed(() => this.orderService.getOrderSignal()());
        this.items = [];
        this.coins.forEach((e) => {
          const item: Items = {id: e.id, nome: e.nome, cotacao: e.cotacao, totalFace: 0, totalValue: 0, faces: []};
          e.faces?.forEach((face) => {
            item.faces?.push({face: face, totalFace: 0, totalValue: 0});
          });
          this.items!.push(item);
        });
      }, error: () => {
        const coins = computed(() => this.orderService.getCoinsSignal()());
        if (coins() != null) {
          this.coins = coins()!;
          this.completeItens();
        }
      }
    });
  }


  completeItens() {
    const order = computed(() => this.orderService.getOrderSignal()());
    if (order() != null) {
      this.orders = order()!;
      this.form.setValue({
        name: this.orders.name,
        document: this.orders.document,
        email: this.orders.email,
        phone: this.orders.phone,
      })
      this.items = this.orders?.items ?? [];
    }
  }

  changeCalc(i: number, i2: number) {
    const orders = this.items![i];
    const faces = orders.faces![i2];
    faces.totalFace = faces.face! * (faces.qtde ?? 0);
    faces.totalValue = faces.totalFace * (orders.cotacao ?? 0);

    orders.totalFace = 0;
    orders.faces?.forEach((e) => {
      orders.totalFace = (orders.totalFace ?? 0) + (e.totalFace ?? 0);
    });

    orders.totalValue = 0;
    orders.faces?.forEach((e) => {
      orders.totalValue = (orders.totalValue ?? 0) + (e.totalValue ?? 0);
    });
  }

  reviewOrder() {
    if (this.form.invalid) {
      return;
    }

    let total = 0;
    this.items?.forEach((e) => {
      total = total + (e.totalValue ?? 0);
    })

    if (total < 100.00) {
      this.alertService.showWarning('O pedido deve ter o mínimo de R$ 100,00 (cem reais) para ser válido.', 'Atenção!');
      return;
    }

    this.orders = {...this.form.value} as Order;
    this.orders.items = this.items;
    this.orderService.updateOrder(this.orders);
    this.router.navigate(['/revisao']);

  }
}

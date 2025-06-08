import {Component, OnInit} from '@angular/core';
import {CoinService} from '../../core/services/coin.service';
import {Coin, Coins, Order} from '../../core/model/coin';
import {JsonPipe, NgClass, NgForOf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {MatButton, MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-order',
  imports: [
    NgForOf,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgClass,
    RouterLink,
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
  orders: Order[] = [];
  indexOrder = 0;

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
        this.orders = [];
        this.coins.forEach((e) => {
          const item: Order = {id: e.id, nome: e.nome, cotacao: e.cotacao, totalFace: 0, totalValue: 0, faces: []};
          e.faces?.forEach((face) => {
            item.faces?.push({face: face, totalFace: 0, totalValue: 0});
          });
          this.orders.push(item);
        });
      }, error: (err) => {
      }
    });
  }

  changeCalc(i: number, i2: number) {
    const orders = this.orders![i];
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
}

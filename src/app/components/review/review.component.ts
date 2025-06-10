import {Component, computed, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {Items, Order} from '../../core/model/order';
import {AlertService} from '../../core/services/alert.service';
import {CurrencyPipe} from '@angular/common';
import {NgxMaskPipe} from 'ngx-mask';

@Component({
  selector: 'app-review',
  imports: [
    MatButton,
    RouterLink,
    ReactiveFormsModule,
    CurrencyPipe,
    NgxMaskPipe
  ],
  templateUrl: './review.component.html',
  standalone: true,
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  order: Order = new Order();
  items: Items[] = [];
  totalValue = 0.0;

  constructor(
    private router: Router,
    private alertService: AlertService,
  ) {
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const or = localStorage.getItem('order');
      if (or != null) {
        this.order = JSON.parse(or!);
        this.items = [];
        this.totalValue = 0.0;
        this.order.items?.forEach((item) => {
          let it: Items = new Items();
          it.faces = [];

          item.faces?.forEach((face) => {
            if (face.qtde != null && face.qtde > 0) {
              this.totalValue = this.totalValue + (face.totalValue ?? 0);
              it.faces?.push(face);
            }
          });

          if (it.faces.length > 0) {
            it.id = item.id;
            it.nome = item.nome;
            it.cotacao = item.cotacao;
            it.totalFace = item.totalFace;
            it.totalValue = item.totalValue;
          }

          this.items.push(it);
        })
      } else {
        this.router.navigate(['/pedido']);
      }
    }
  }

  onSave() {
    this.alertService.showSuccess('O pedido foi finalizado com sucesso.', 'Sucesso!');
    localStorage.removeItem('coins');
    localStorage.removeItem('order');
    this.router.navigate(['/']);
  }
}

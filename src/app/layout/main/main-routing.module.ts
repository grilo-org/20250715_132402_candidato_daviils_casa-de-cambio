import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {ReviewComponent} from '../../components/review/review.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('../../components/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'pedido',
        loadComponent: () => import('../../components/order/order.component').then(m => m.OrderComponent)
      },
      {
        path: 'revisao',
        loadComponent: () => import('../../components/review/review.component').then(m => m.ReviewComponent)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}

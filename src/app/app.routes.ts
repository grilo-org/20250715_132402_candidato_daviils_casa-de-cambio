import { Routes } from '@angular/router';
import path from 'node:path';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/main/main.module').then(m => m.MainModule),
  }
];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { newPass } from './models/newPassModel';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then((m) => m.RegisterModule),
  },
  { path: 'newPass/:token', loadChildren: () => import('./auth/new-pass/new-pass.module').then(m => m.NewPassModule) },
  { path: 'transactions', loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule) },
  { path: 'miCuenta', loadChildren: () => import('./mi-cuenta/mi-cuenta.module').then(m => m.MiCuentaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

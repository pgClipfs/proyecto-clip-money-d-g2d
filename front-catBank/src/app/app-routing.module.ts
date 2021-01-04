import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
<<<<<<< HEAD
  { path: 'newPass', loadChildren: () => import('./auth/new-pass/new-pass.module').then(m => m.NewPassModule) },
=======
  { path: 'transactions', loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule) },
  { path: 'miCuenta', loadChildren: () => import('./mi-cuenta/mi-cuenta.module').then(m => m.MiCuentaModule) },
  
>>>>>>> d4a6e8a53a26cb3a1b10f827383e5fd532a8f945
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

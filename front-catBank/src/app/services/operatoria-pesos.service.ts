import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OperatoriaPesosService {
  url = 'https://localhost:44300/api';

  constructor(private http: HttpClient, private router: Router) { }
  ingresarSaldo(IngresarSaldo){
    let header = new HttpHeaders().set('Content-Type', 'aplication/json');
     return this.http.put<string>(this.url+'/cuentas/ingresarsaldo', IngresarSaldo);

  }
  retirarSaldo(IngresarSaldo){
    let header = new HttpHeaders().set('Content-Type', 'aplication/json');
     return this.http.put<string>(this.url+'/cuentas/retirardinero', IngresarSaldo);

  }

  transferenciaSaldo(TransferirSaldo){
    let header = new HttpHeaders().set('Content-Type', 'aplication/json');
     return this.http.put<string>(this.url+'/cuentas/transferencia', TransferirSaldo);

  }
  accountInfo() {
    let authToken=  localStorage.getItem('Cliente');
    let header = new HttpHeaders().set('Content-Type', 'aplication/json');
    return this.http.get(this.url+'/cuentas/mostrarsaldo?id='+authToken)
  }
}

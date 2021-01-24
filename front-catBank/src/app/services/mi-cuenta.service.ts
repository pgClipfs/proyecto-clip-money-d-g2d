import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { authToken } from '../models/authToken';

@Injectable({
  providedIn: 'root'
})
export class MiCuentaService implements HttpInterceptor {

  url = 'https://localhost:44300/api';

  constructor(private http: HttpClient, private router: Router) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken: string =localStorage.getItem('token');
    // set global application headers.
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
        'X-Locale': 'en'
      }
    });
    // Set headers for requests that require authorization.
    if (accessToken) {
      const authenticatedRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Token token=${accessToken}`
        )
      });
      // Request with authorization headers
      return next.handle(authenticatedRequest);
    } else {
      // Request without authorization header
      return next.handle(request);
    }
  }
  // getUserInfo(token: authToken): Observable<string>{
  //   const authToken: string = localStorage.getItem('token');
  //   let header = new HttpHeaders({ 'Content-Type': 'aplication/json', 
  //   'Authorization': "Bearer "+authToken,
  //   'Access-Control-Allow-Origin' : '*',
  //   'Access-Control-Allow-Methods' : 'GET, POST, PUT,PATCH,DELETE',
  //   'Access-Control-Allow-Headers': 'Content-Type, Origin, Accept, Authorization, Content-lenght, X-Requested-With '} );
  //   console.log(header)
    
  //    return this.http.post<string>(this.url+'/persona/customer',token);
  // }

  userInfo() {
    let authToken=  localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Accept': 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Authorization': `Bearer ${authToken}`
    })
    return this.http.get(this.url+'/persona/customer',{
      
      headers: headers,
    })
  }

  modifyInfo(modifyUserInfo){
    let header = new HttpHeaders().set('Content-Type', 'aplication/json');
     return this.http.put<string>(this.url+'/persona/', modifyUserInfo);

  }

  activarCuenta(activarCuenta): Observable<string>{
    let header = new HttpHeaders().set('Content-Type', 'aplication/json');
     return this.http.post<string>(this.url+'/cuenta/activarCuenta', activarCuenta);
  }

}

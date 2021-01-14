import { HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {authToken} from 'src/app/models/authToken';
import { MiCuentaService } from '../services/mi-cuenta.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.scss']
})
export class MiCuentaComponent implements OnInit {

  token = new authToken();
  

  constructor(private miCuentaService: MiCuentaService,  private router: Router) { }

  ngOnInit(): void {
    this.token.Jwt = localStorage.getItem('token');
    console.log(this.token)
    this.miCuentaService.getUserInfo(this.token).subscribe(resp =>{
      
      this.router.navigate(['/login'])
      console.log(resp)
    },
    err =>{
      console.log(err)
    });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[AuthService]
})
export class NavbarComponent{
  public user$: Observable<any> = this.authSvc.afAuth.user;
  constructor(private authSvc: AuthService, public _authService: LoginService, private router: Router) { }

  onToggle(){
    const navItems = document.querySelector('.navbar-collapse')
    navItems.classList.toggle('ocultar_menu')
  }
  async onLogout(){
    try {
      localStorage.removeItem('token');
      this.router.navigate(['/login'])
    } catch (error) {
      console.log(error)
    }
  }
}

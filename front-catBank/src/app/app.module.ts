import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { FooterComponent } from './shared/footer/footer.component';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
<<<<<<< HEAD
import { ReserPassComponent } from './auth/auth/reser-pass/reser-pass.component';
=======
import { TransaccionesComponent } from './transacciones/transacciones.component';
>>>>>>> d4a6e8a53a26cb3a1b10f827383e5fd532a8f945

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
<<<<<<< HEAD
    ReserPassComponent,
=======
    TransaccionesComponent
>>>>>>> d4a6e8a53a26cb3a1b10f827383e5fd532a8f945
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment),
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

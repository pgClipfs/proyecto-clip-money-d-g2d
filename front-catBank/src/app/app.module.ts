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
import { FormsModule } from '@angular/forms';
import { TransaccionesComponent } from './transacciones/transacciones.component';
=======
>>>>>>> master

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
<<<<<<< HEAD
    TransaccionesComponent
=======
>>>>>>> master
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

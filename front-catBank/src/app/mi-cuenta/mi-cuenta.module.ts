import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiCuentaRoutingModule } from './mi-cuenta-routing.module';
import { MiCuentaComponent } from './mi-cuenta.component';


@NgModule({
  declarations: [MiCuentaComponent],
  imports: [
    CommonModule,
    MiCuentaRoutingModule
  ]
})
export class MiCuentaModule { }

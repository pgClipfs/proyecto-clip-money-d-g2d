import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiCuentaRoutingModule } from './mi-cuenta-routing.module';
import { MiCuentaComponent } from './mi-cuenta.component';
import { ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [MiCuentaComponent],
  imports: [
    CommonModule,
    MiCuentaRoutingModule,
    ReactiveFormsModule
  ]
})
export class MiCuentaModule { }

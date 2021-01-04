import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewPassRoutingModule } from './new-pass-routing.module';
import { NewPassComponent } from './new-pass.component';


@NgModule({
  declarations: [NewPassComponent],
  imports: [
    CommonModule,
    NewPassRoutingModule
  ]
})
export class NewPassModule { }

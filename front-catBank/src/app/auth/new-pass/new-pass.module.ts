import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPassRoutingModule } from './new-pass-routing.module';
import { NewPassComponent } from './new-pass.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NewPassComponent],
  imports: [
    CommonModule,
    NewPassRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, 
  ]
})
export class NewPassModule { }

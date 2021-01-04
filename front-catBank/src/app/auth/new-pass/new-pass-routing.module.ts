import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPassComponent } from './new-pass.component';

const routes: Routes = [{ path: '', component: NewPassComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewPassRoutingModule { }

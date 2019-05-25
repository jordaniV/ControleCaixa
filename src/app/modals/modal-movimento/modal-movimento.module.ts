import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { ModalMovimentoPage } from './modal-movimento.page';

const routes: Routes = [
  {
    path: '',
    component: ModalMovimentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrMaskerModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalMovimentoPage]
})
export class ModalMovimentoPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

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
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalMovimentoPage]
})
export class ModalMovimentoPageModule {}

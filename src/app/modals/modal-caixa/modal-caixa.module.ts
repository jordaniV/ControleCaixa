import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { CurrencyMaskModule } from 'ngx-currency-mask';

import { ModalCaixaPage } from './modal-caixa.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCaixaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalCaixaPage]
})
export class ModalCaixaPageModule {}

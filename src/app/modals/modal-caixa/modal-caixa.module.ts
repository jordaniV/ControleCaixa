import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalCaixaPage } from './modal-caixa.page';
import { BrMaskerModule } from 'br-mask';

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
    IonicModule,
    BrMaskerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalCaixaPage]
})
export class ModalCaixaPageModule {}

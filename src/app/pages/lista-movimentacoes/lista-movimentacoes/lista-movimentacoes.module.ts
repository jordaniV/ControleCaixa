import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaMovimentacoesPage } from './lista-movimentacoes.page';

const routes: Routes = [
  {
    path: '',
    component: ListaMovimentacoesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaMovimentacoesPage]
})
export class ListaMovimentacoesPageModule {}

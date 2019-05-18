import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'lista-caixas', loadChildren: './pages/lista-caixas/lista-caixas/lista-caixas.module#ListaCaixasPageModule' },
  // tslint:disable-next-line:max-line-length
  { path: 'lista-movimentacoes', loadChildren: './pages/lista-movimentacoes/lista-movimentacoes/lista-movimentacoes.module#ListaMovimentacoesPageModule' },
  { path: 'modal-caixa', loadChildren: './modals/modal-caixa/modal-caixa.module#ModalCaixaPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
    { path: 'lista-caixas', loadChildren: './pages/lista-caixas/lista-caixas/lista-caixas.module#ListaCaixasPageModule' },
    // tslint:disable-next-line:max-line-length
    { path: 'lista-movimentacoes', loadChildren: './pages/lista-movimentacoes/lista-movimentacoes/lista-movimentacoes.module#ListaMovimentacoesPageModule' },
    { path: 'modal-caixa', loadChildren: './modals/modal-caixa/modal-caixa.module#ModalCaixaPageModule' },
    { path: 'modal-movimento', loadChildren: './modals/modal-movimento/modal-movimento.module#ModalMovimentoPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map
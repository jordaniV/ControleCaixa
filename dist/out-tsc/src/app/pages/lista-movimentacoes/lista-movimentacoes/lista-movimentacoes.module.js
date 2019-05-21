import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListaMovimentacoesPage } from './lista-movimentacoes.page';
var routes = [
    {
        path: '',
        component: ListaMovimentacoesPage
    }
];
var ListaMovimentacoesPageModule = /** @class */ (function () {
    function ListaMovimentacoesPageModule() {
    }
    ListaMovimentacoesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ListaMovimentacoesPage]
        })
    ], ListaMovimentacoesPageModule);
    return ListaMovimentacoesPageModule;
}());
export { ListaMovimentacoesPageModule };
//# sourceMappingURL=lista-movimentacoes.module.js.map
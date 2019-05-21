import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListaCaixasPage } from './lista-caixas.page';
var routes = [
    {
        path: '',
        component: ListaCaixasPage
    }
];
var ListaCaixasPageModule = /** @class */ (function () {
    function ListaCaixasPageModule() {
    }
    ListaCaixasPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ListaCaixasPage]
        })
    ], ListaCaixasPageModule);
    return ListaCaixasPageModule;
}());
export { ListaCaixasPageModule };
//# sourceMappingURL=lista-caixas.module.js.map
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModalCaixaPage } from './modal-caixa.page';
var routes = [
    {
        path: '',
        component: ModalCaixaPage
    }
];
var ModalCaixaPageModule = /** @class */ (function () {
    function ModalCaixaPageModule() {
    }
    ModalCaixaPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                ReactiveFormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ModalCaixaPage]
        })
    ], ModalCaixaPageModule);
    return ModalCaixaPageModule;
}());
export { ModalCaixaPageModule };
//# sourceMappingURL=modal-caixa.module.js.map
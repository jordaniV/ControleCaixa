import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModalMovimentoPage } from './modal-movimento.page';
var routes = [
    {
        path: '',
        component: ModalMovimentoPage
    }
];
var ModalMovimentoPageModule = /** @class */ (function () {
    function ModalMovimentoPageModule() {
    }
    ModalMovimentoPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                ReactiveFormsModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ModalMovimentoPage]
        })
    ], ModalMovimentoPageModule);
    return ModalMovimentoPageModule;
}());
export { ModalMovimentoPageModule };
//# sourceMappingURL=modal-movimento.module.js.map
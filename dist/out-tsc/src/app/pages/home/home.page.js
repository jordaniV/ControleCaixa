import * as tslib_1 from "tslib";
import { ModalMovimentoPage } from './../../modals/modal-movimento/modal-movimento.page';
import { ModalCaixaPage } from './../../modals/modal-caixa/modal-caixa.page';
import { Component } from '@angular/core';
import { AlertController, ToastController, NavController, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
var HomePage = /** @class */ (function () {
    function HomePage(alertCtrl, toastCtrl, modalCtrl, navCtrl, storage) {
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.storage = storage;
    }
    HomePage.prototype.openMovimentacao = function () {
        this.navCtrl.navigateForward('lista-movimentacoes');
    };
    HomePage.prototype.openCaixa = function () {
        this.navCtrl.navigateForward('lista-caixas');
    };
    HomePage.prototype.addCaixa = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: ModalCaixaPage
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.addMovimento = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: ModalMovimentoPage
                        })];
                    case 1:
                        modal1 = _a.sent();
                        return [4 /*yield*/, modal1.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.showToast = function (msj) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: msj,
                            duration: 1500
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.showError = function (error) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Erro',
                            subHeader: error,
                            buttons: ['Fechar']
                        })];
                    case 1:
                        alert = _a.sent();
                        alert.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            ToastController,
            ModalController,
            NavController,
            StorageService])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map
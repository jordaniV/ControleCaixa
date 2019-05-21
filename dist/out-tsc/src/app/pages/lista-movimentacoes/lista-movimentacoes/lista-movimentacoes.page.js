import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { IonList, ToastController, AlertController, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ModalMovimentoPage } from 'src/app/modals/modal-movimento/modal-movimento.page';
var ListaMovimentacoesPage = /** @class */ (function () {
    function ListaMovimentacoesPage(storage, toastCtrl, alertCtrl, modalCtrl) {
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.movimentos = [];
    }
    ListaMovimentacoesPage.prototype.ngOnInit = function () { };
    ListaMovimentacoesPage.prototype.ionViewWillEnter = function () {
        this.refresh();
    };
    ListaMovimentacoesPage.prototype.refresh = function () {
        var _this = this;
        // this.movimentos = [];
        this.storage
            .getAll('movimentacoes')
            .then(function (result) {
            _this.movimentos = result;
        })
            .catch(function (error) { _this.showError(error); });
    };
    ListaMovimentacoesPage.prototype.update = function (movimento) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: ModalMovimentoPage,
                            componentProps: {
                                registro: movimento
                            }
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
    ListaMovimentacoesPage.prototype.delete = function (movimento) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Aviso',
                            subHeader: 'Deseja excluir a movimentação permanentemente?',
                            buttons: [
                                {
                                    text: 'Não',
                                    role: 'nao',
                                    handler: function () { return; }
                                },
                                {
                                    text: 'Sim',
                                    role: 'sim',
                                    handler: function () {
                                        _this.storage.delete(movimento.id, 'movimentacoes').then(function () {
                                            _this.showToast('Movimentação excluída');
                                            _this.lista.closeSlidingItems();
                                            _this.refresh();
                                        });
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert1 = _a.sent();
                        alert1.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ListaMovimentacoesPage.prototype.showToast = function (msj) {
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
    ListaMovimentacoesPage.prototype.showError = function (error) {
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
    tslib_1.__decorate([
        ViewChild('lista'),
        tslib_1.__metadata("design:type", IonList)
    ], ListaMovimentacoesPage.prototype, "lista", void 0);
    ListaMovimentacoesPage = tslib_1.__decorate([
        Component({
            selector: 'app-lista-movimentacoes',
            templateUrl: './lista-movimentacoes.page.html',
            styleUrls: ['./lista-movimentacoes.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [StorageService,
            ToastController,
            AlertController,
            ModalController])
    ], ListaMovimentacoesPage);
    return ListaMovimentacoesPage;
}());
export { ListaMovimentacoesPage };
//# sourceMappingURL=lista-movimentacoes.page.js.map
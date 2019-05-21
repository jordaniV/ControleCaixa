import * as tslib_1 from "tslib";
import { StorageService } from './../../../services/storage/storage.service';
import { Component, ViewChild } from '@angular/core';
import { IonList, ToastController, AlertController } from '@ionic/angular';
var ListaCaixasPage = /** @class */ (function () {
    function ListaCaixasPage(storage, toastCtrl, alertCtrl) {
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.caixas = [];
    }
    ListaCaixasPage.prototype.ngOnInit = function () { };
    ListaCaixasPage.prototype.ionViewWillEnter = function () {
        this.refresh();
    };
    ListaCaixasPage.prototype.update = function (caixa) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Atualização de Caixa',
                            inputs: [
                                {
                                    name: 'descricao',
                                    type: 'text',
                                    value: caixa.descricao
                                },
                                {
                                    name: 'saldoInicial',
                                    type: 'number',
                                    value: caixa.saldoInicial
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Fechar',
                                    role: 'fechar',
                                    handler: function () { return; }
                                },
                                {
                                    text: 'Atualizar',
                                    role: 'atualizar',
                                    handler: function (data) {
                                        data.id = caixa.id;
                                        _this.storage
                                            .update(data, 'caixas')
                                            .then(function () {
                                            _this.showToast('Caixa atualizado com sucesso!');
                                            _this.lista.closeSlidingItems();
                                            _this.refresh();
                                        })
                                            .catch(function (error) {
                                            _this.showError(error);
                                        });
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ListaCaixasPage.prototype.delete = function (caixa) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Aviso',
                            subHeader: 'Deseja excluir o caixa permanentemente?',
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
                                        _this.storage.delete(caixa.id, 'caixas').then(function () {
                                            _this.showToast('Caixa excluído');
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
    ListaCaixasPage.prototype.refresh = function () {
        var _this = this;
        this.caixas = [];
        this.storage
            .getAll('caixas')
            .then(function (result) {
            _this.caixas = result;
        })
            .catch(function (error) { _this.showError(error); });
    };
    ListaCaixasPage.prototype.showToast = function (msj) {
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
    ListaCaixasPage.prototype.showError = function (error) {
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
    ], ListaCaixasPage.prototype, "lista", void 0);
    ListaCaixasPage = tslib_1.__decorate([
        Component({
            selector: 'app-lista-caixas',
            templateUrl: './lista-caixas.page.html',
            styleUrls: ['./lista-caixas.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [StorageService,
            ToastController,
            AlertController])
    ], ListaCaixasPage);
    return ListaCaixasPage;
}());
export { ListaCaixasPage };
//# sourceMappingURL=lista-caixas.page.js.map
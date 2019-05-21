import * as tslib_1 from "tslib";
import { StorageService } from 'src/app/services/storage/storage.service';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
var ModalCaixaPage = /** @class */ (function () {
    function ModalCaixaPage(formBuilder, modalCtrl, toastCtrl, alertCtrl, storage) {
        this.formBuilder = formBuilder;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.caixaForm = this.formBuilder.group({
            descricao: new FormControl('', Validators.required),
            saldoInicial: new FormControl('', Validators.required)
        });
    }
    ModalCaixaPage.prototype.ngOnInit = function () {
    };
    ModalCaixaPage.prototype.add = function () {
        var _this = this;
        var formCaixa = this.caixaForm.value; // PEGO OS DADOS DO FORMULARIO
        this.storage
            .ehDuplicado('caixas', formCaixa.descricao)
            .then(function (duplicado) {
            if (duplicado) {
                _this.showError('Não pode existir dois caixas como mesmo nome!');
            }
            else {
                formCaixa.id = Date.now();
                _this.storage
                    .add(formCaixa, 'caixas')
                    .then(function () {
                    _this.showToast('Caixa adicionado com sucesso!');
                    _this.fechar();
                })
                    .catch(function (error) {
                    _this.showError(error);
                });
            }
        });
    };
    ModalCaixaPage.prototype.fechar = function () {
        this.modalCtrl.dismiss();
    };
    ModalCaixaPage.prototype.showToast = function (msj) {
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
    ModalCaixaPage.prototype.showError = function (error) {
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
    ModalCaixaPage = tslib_1.__decorate([
        Component({
            selector: 'app-modal-caixa',
            templateUrl: './modal-caixa.page.html',
            styleUrls: ['./modal-caixa.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            ModalController,
            ToastController,
            AlertController,
            StorageService])
    ], ModalCaixaPage);
    return ModalCaixaPage;
}());
export { ModalCaixaPage };
//# sourceMappingURL=modal-caixa.page.js.map
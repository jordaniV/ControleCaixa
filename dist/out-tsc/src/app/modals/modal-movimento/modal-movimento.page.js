import * as tslib_1 from "tslib";
import { StorageService } from 'src/app/services/storage/storage.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalController, ToastController, AlertController, NavParams, NavController } from '@ionic/angular';
import { Component } from '@angular/core';
var ModalMovimentoPage = /** @class */ (function () {
    function ModalMovimentoPage(navParams, navCtrl, modalCtrl, toastCtrl, alertCtrl, formBuilder, storage) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.caixaAtual = '';
        this.ehupdate = false;
        this.tipos = [
            {
                desc: 'Entrada',
                valor: 'E'
            },
            {
                desc: 'Saída',
                valor: 'S'
            }
        ];
        this.movimentoForm = this.formBuilder.group({
            tipo: new FormControl('', Validators.required),
            descricao: new FormControl('', Validators.required),
            valor: new FormControl('', Validators.required),
            data: new FormControl('', Validators.required),
            caixa: new FormControl('', Validators.required),
            id: new FormControl()
        });
    }
    ModalMovimentoPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.getAll('caixas')
            .then(function (result) {
            _this.caixas = result;
        });
        this.movimento = this.navParams.get('registro');
        if (this.movimento !== undefined) {
            this.movimentoForm.get('tipo').setValue(this.movimento.tipo);
            this.movimentoForm.get('descricao').setValue(this.movimento.descricao);
            this.movimentoForm.get('valor').setValue(this.movimento.valor);
            this.movimentoForm.get('data').setValue(this.movimento.data);
            this.movimentoForm.get('caixa').setValue(this.movimento.caixa);
            this.movimentoForm.get('id').setValue(this.movimento.id);
            this.caixaAtual = this.movimento.caixa;
            this.ehupdate = true;
        }
        else {
            this.caixaAtual = 'Não existe.';
        }
    };
    ModalMovimentoPage.prototype.add = function () {
        var _this = this;
        var formMovimento = this.movimentoForm.value;
        // const data = this.datepipe.transform(formMovimento.data, 'dd/MM/yyyy');
        // formMovimento.data = data;
        if (this.ehupdate) {
            this.storage
                .update(formMovimento, 'movimentacoes')
                .then(function () {
                _this.showToast('Movimentação atualizada com sucesso!');
                _this.navCtrl.navigateRoot('home');
                _this.fechar();
            })
                .catch(function (error) {
                _this.showError(error);
            });
        }
        else {
            formMovimento.id = Date.now();
            this.storage
                .add(formMovimento, 'movimentacoes')
                .then(function () {
                _this.showToast('Movimentação adicionada com sucesso!')
                    .catch(function (error) {
                    _this.showError(error);
                });
            });
        }
        this.ehupdate = false;
    };
    ModalMovimentoPage.prototype.fechar = function () {
        this.modalCtrl.dismiss();
    };
    ModalMovimentoPage.prototype.showToast = function (msj) {
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
    ModalMovimentoPage.prototype.showError = function (error) {
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
    ModalMovimentoPage = tslib_1.__decorate([
        Component({
            selector: 'app-modal-movimento',
            templateUrl: './modal-movimento.page.html',
            styleUrls: ['./modal-movimento.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavParams,
            NavController,
            ModalController,
            ToastController,
            AlertController,
            FormBuilder,
            StorageService])
    ], ModalMovimentoPage);
    return ModalMovimentoPage;
}());
export { ModalMovimentoPage };
//# sourceMappingURL=modal-movimento.page.js.map
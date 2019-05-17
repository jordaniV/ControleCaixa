import { Component } from '@angular/core';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { Caixa } from 'src/app/domains/caixa';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public caixa: Caixa;

  constructor(private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              private storage: StorageService) { }


  openMovimentacao() {
    this.navCtrl.navigateForward('lista-movimentacoes');
  }

  openCaixa() {
    this.navCtrl.navigateForward('lista-caixas');
  }

  async addCaixa() {
    const alert = await this.alertCtrl.create({
      header: 'Cadastro de Caixa',
      inputs: [
        {
          name: 'descricao',
          type: 'text',
          placeholder: 'Descrição'

        },
        {
          name: 'saldoInicial',
          type: 'number',
          placeholder: 'Saldo Inicial R$'
        }],
      buttons: [
        {
          text: 'Fechar',
          role: 'fechar',
          handler: () => { return; }
        },
        {
          text: 'Cadastrar',
          role: 'cadastrar',
          handler: (result: Caixa) => {

            result.id = Date.now();

            if (result.descricao === '' || result.saldoInicial.toString().length === 0) {
              this.showError('Os campos não podem ficar vazios!');
            } else {
              this.storage
                .ehDuplicado('caixas', result.descricao)
                .then(duplicado => {
                  if (duplicado) {
                    this.showError('Não pode existir dois caixas como mesmo nome!');
                  } else {
                    this.storage
                      .add(result, 'caixas')
                      .then(() => {
                        this.showToast('Caixa adicionado com sucesso!');
                      })
                      .catch((error: Error) => {
                        this.showError(error);
                      });
                  }
                });
            }
          }
        }
      ]
    });
    alert.present();
  }

  async showToast(msj) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 1500
    });
    toast.present();
  }

  async showError(error) {
    const alert = await this.alertCtrl.create({
      header: 'Erro',
      subHeader: error,
      buttons: ['Fechar']
    });
    alert.present();
  }

}

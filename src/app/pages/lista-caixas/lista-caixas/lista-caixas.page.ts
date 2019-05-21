import { StorageService } from './../../../services/storage/storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ToastController, AlertController } from '@ionic/angular';
import { Caixa } from 'src/app/domains/caixa';

@Component({
  selector: 'app-lista-caixas',
  templateUrl: './lista-caixas.page.html',
  styleUrls: ['./lista-caixas.page.scss'],
})
export class ListaCaixasPage implements OnInit {

  caixas: Caixa[] = [];

  @ViewChild('lista') lista: IonList;

  constructor(private storage: StorageService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.refresh();
  }

  async update(caixa: Caixa) {

    const alert = await this.alertCtrl.create({
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
          handler: () => { return; }
        },
        {
          text: 'Atualizar',
          role: 'atualizar',
          handler: (data: Caixa) => {

            data.id = caixa.id;

            this.storage
              .update(data, 'caixas')
              .then(() => {
                this.showToast('Caixa atualizado com sucesso!');
                this.lista.closeSlidingItems();
                this.refresh();
              })
              .catch((error) => {
                this.showError(error);
              });
          }
        }
      ]
    });
    await alert.present();



  }

  async delete(caixa: Caixa) {

    const alert1 = await this.alertCtrl.create({
      header: 'Aviso',
      subHeader: 'Deseja excluir o caixa permanentemente?',
      buttons: [
        {
          text: 'Não',
          role: 'nao',
          handler: () => { return; }
        },
        {
          text: 'Sim',
          role: 'sim',
          handler: () => {
            this.storage.delete(caixa.id, 'caixas').then(() => {
              this.showToast('Caixa excluído');
              this.lista.closeSlidingItems();
              this.refresh();
            });
          }
        }
      ]
    });

    alert1.present();
  }

  refresh() {
    this.caixas = [];
    this.storage
      .getAll('caixas')
      .then((result: Caixa[]) => {
        this.caixas = result;
      })
      .catch((error) => { this.showError(error); });

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

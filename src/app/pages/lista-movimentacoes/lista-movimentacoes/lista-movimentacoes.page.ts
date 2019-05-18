import { Movimentacao } from './../../../domains/movimentacao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ToastController, AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-lista-movimentacoes',
  templateUrl: './lista-movimentacoes.page.html',
  styleUrls: ['./lista-movimentacoes.page.scss'],
})
export class ListaMovimentacoesPage implements OnInit {

  movimentos: Movimentacao[] = [];

  @ViewChild('lista') lista: IonList;

  constructor(private storage: StorageService,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.refresh();
  }

  refresh() {
    this.movimentos = [];
    this.storage
      .getAll('movimentos')
      .then((result: Movimentacao[]) => {
        this.movimentos = result;
      })
      .catch((error) => { this.showError(error); });

  }

  async update(movimento: Movimentacao) {

    const alert = await this.alertCtrl.create({
      header: 'Atualização de Movimento',
      inputs: [
        {
          name: 'entrada',
          type: 'radio',
          label: 'Entrada',
          value: movimento.tipo,
          checked: true
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
          handler: (data: Movimentacao) => {

            data.id = movimento.id;

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

  async delete(movimento: Movimentacao) {

    const alert1 = await this.alertCtrl.create({
      header: 'Aviso',
      subHeader: 'Deseja excluir o movimento permanentemente?',
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
            this.storage.delete(movimento.id, 'movimentos').then(() => {
              this.showToast('Movimento excluído');
              this.lista.closeSlidingItems();
              this.refresh();
            });
          }
        }
      ]
    });

    alert1.present();

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

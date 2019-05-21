import { Movimentacao } from './../../../domains/movimentacao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ToastController, AlertController, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ModalMovimentoPage } from 'src/app/modals/modal-movimento/modal-movimento.page';

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
              private alertCtrl: AlertController,
              private modalCtrl: ModalController) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.refresh();
  }


  refresh() {
    // this.movimentos = [];
    this.storage
      .getAll('movimentacoes')
      .then((result: Movimentacao[]) => {
        this.movimentos = result;
      })
      .catch((error) => { this.showError(error); });

  }

  async delete(movimento: Movimentacao) {

    const alert1 = await this.alertCtrl.create({
      header: 'Aviso',
      subHeader: 'Deseja excluir a movimentação permanentemente?',
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
            this.storage.delete(movimento.id, 'movimentacoes').then(() => {
              this.showToast('Movimentação excluída');
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

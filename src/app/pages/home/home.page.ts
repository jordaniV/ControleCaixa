import { ModalCaixaPage } from './../../modals/modal-caixa/modal-caixa.page';
import { Component } from '@angular/core';
import { AlertController, ToastController, NavController, ModalController } from '@ionic/angular';
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
              private modalCtrl: ModalController,
              private navCtrl: NavController,
              private storage: StorageService) { }


  openMovimentacao() {
    this.navCtrl.navigateForward('lista-movimentacoes');
  }

  openCaixa() {
    this.navCtrl.navigateForward('lista-caixas');
  }

  async addCaixa() {

    const modal = await this.modalCtrl.create({
      component: ModalCaixaPage
    });
    await modal.present();
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

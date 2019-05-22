import { Movimentacao } from './../../domains/movimentacao';
import { ModalMovimentoPage } from './../../modals/modal-movimento/modal-movimento.page';
import { ModalCaixaPage } from './../../modals/modal-caixa/modal-caixa.page';
import { Component } from '@angular/core';
import { AlertController, ToastController, NavController, ModalController, LoadingController } from '@ionic/angular';
import { Caixa } from 'src/app/domains/caixa';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public caixa: Caixa;
  caixas: Caixa[];
  movimento: Movimentacao;
  anos = [];
  maisFiltro = false;
  botaoMais = 'Expandir';
  carregando;

  meses = [
    { mes: 'Janeiro', valor: '01'}, { mes: 'Fevereiro', valor: '02'}, { mes: 'Março', valor: '03'},
    { mes: 'Abril', valor: '04'}, { mes: 'Maio', valor: '05'}, { mes: 'Junho', valor: '06' },
    { mes: 'Julho', valor: '07'}, { mes: 'Agosto', valor: '08'}, { mes: 'Setembro', valor: '09'},
    { mes: 'Outubro', valor: '10'}, { mes: 'Novembro', valor: '11'}, { mes: 'Dezembro', valor: '12'},

  ];
  constructor(private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private storage: StorageService) { }


  ionViewWillEnter() {
    this.maisFiltro = true;
    this.abreFiltros();
  }
  openMovimentacao() {
    this.navCtrl.navigateForward('lista-movimentacoes');
  }

  openCaixa() {
    this.navCtrl.navigateForward('lista-caixas');
  }

  abreFiltros() {
    if (this.maisFiltro) {
      this.maisFiltro = false;
      this.botaoMais = 'Expandir';
    } else {
      this.maisFiltro = true;
      this.botaoMais = 'Recolher';
      this.listaFiltros();
    }
  }

  listaFiltros() {

    // this.showLoading('Carregando filtros...');

    this.storage
        .getAllAno('movimentacoes')
        .then((result: any[]) => {
          this.anos = [];
          this.anos = result;
          console.log(this.anos);
          // this.carregando.dismiss();
        })
        .catch((error: Error) => { console.log(error); });

    this.storage
        .getAll('caixas')
        .then((cxs: Caixa[]) => {
          this.caixas = cxs;
        })
        .catch((error: Error) => { console.log(error); });



  }

  async addCaixa() {

    const modal = await this.modalCtrl.create({
      component: ModalCaixaPage
    });
    await modal.present();
  }

  async addMovimento() {

    const modal1 = await this.modalCtrl.create({
      component: ModalMovimentoPage
    });
    await modal1.present();
  }

  async showToast(msj) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 1500
    });
    await toast.present();
  }

  async showError(error) {
    const alert = await this.alertCtrl.create({
      header: 'Erro',
      subHeader: error,
      buttons: ['Fechar']
    });
    await alert.present();
  }

  async showLoading(msj) {
    this.carregando = await this.loadingCtrl.create({
      message: msj
    });

    await this.carregando.present();
  }

}

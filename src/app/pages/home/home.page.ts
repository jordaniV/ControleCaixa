import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Movimentacao } from './../../domains/movimentacao';
import { ModalMovimentoPage } from './../../modals/modal-movimento/modal-movimento.page';
import { ModalCaixaPage } from './../../modals/modal-caixa/modal-caixa.page';
import { Component } from '@angular/core';
import { AlertController, ToastController, NavController, ModalController, LoadingController } from '@ionic/angular';
import { Caixa } from 'src/app/domains/caixa';
import { StorageService } from 'src/app/services/storage/storage.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  filtroForm: FormGroup;

  caixa: Caixa;
  caixas: Caixa[];
  movimento: Movimentacao;
  anos = [];
  maisFiltro = false;
  botaoMais = 'Expandir';

  saldoEntrada = 0;
  saldoSaida = 0;
  saldoFinal = 0;

  meses = [
    { mes: 'Janeiro', valor: '01' }, { mes: 'Fevereiro', valor: '02' }, { mes: 'Março', valor: '03' },
    { mes: 'Abril', valor: '04' }, { mes: 'Maio', valor: '05' }, { mes: 'Junho', valor: '06' },
    { mes: 'Julho', valor: '07' }, { mes: 'Agosto', valor: '08' }, { mes: 'Setembro', valor: '09' },
    { mes: 'Outubro', valor: '10' }, { mes: 'Novembro', valor: '11' }, { mes: 'Dezembro', valor: '12' },

  ];
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private storage: StorageService,
    private formBuilder: FormBuilder) {
    this.filtroForm = this.formBuilder.group({
      ano: new FormControl('', Validators.required),
      mes: new FormControl('', Validators.required),
      caixa: new FormControl('', Validators.required)
    });
  }


  ionViewWillEnter() {
    this.maisFiltro = true;
    this.abreFiltros();
  }

  // EFETUA A PESQUISA E LISTAGEM DE ENTRADAS E SAIDAS DO MES A PARTIR DOS FILTROS SELECIONADOS
  pesquisar() {
    const formFiltro = this.filtroForm.value;
    let id = 0;
    this.saldoEntrada = 0;
    this.saldoSaida = 0;
    this.saldoFinal = 0;

    this.storage
      .getAllByFiltros('movimentacoes', formFiltro)
      .then((resultFiltro: Movimentacao[]) => {

        for (const i of resultFiltro) {
          id = i.id;
          if (i.tipo === 'E') {
            this.saldoEntrada = this.saldoEntrada + i.valor;
          } else if (i.tipo === 'S') {
            this.saldoSaida = this.saldoSaida + i.valor;
          }
        }
        this.saldoFinal = this.saldoEntrada - this.saldoSaida;
      });
  }

  // ABRE A LISTAGEM DE MOVIMENTAÇÕES
  openMovimentacao() {
    this.navCtrl.navigateForward('lista-movimentacoes');
  }

  // ABRE A LISTAGEM DE CAIXA
  openCaixa() {
    this.navCtrl.navigateForward('lista-caixas');
  }

  // IMPLEMENTA O EXPANDIR/RECOLHER DOS FILTROS
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

  // REALIZA A LISTAGEM DOS CAMPOS DOS FILTROS
  listaFiltros() {

    this.storage
      .getAllAno('movimentacoes')
      .then((result: any[]) => {
        this.anos = [];
        this.anos = result;
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

  // ABRE O MODAL DE CADASTRO DE CAIXAS
  async addCaixa() {

    const modal = await this.modalCtrl.create({
      component: ModalCaixaPage
    });
    await modal.present();
  }

  // ABRE O MODAL DE CADASTRO DE MOVIMENTAÇÕES
  async addMovimento() {

    const modal1 = await this.modalCtrl.create({
      component: ModalMovimentoPage
    });
    await modal1.present();
  }

  // METODOS QUE GERAM MENSAGEM AO USUÁRIO
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

}

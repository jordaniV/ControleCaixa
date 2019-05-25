import { DatePipe } from '@angular/common';
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

  constructor(
    private storage: StorageService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private datepipe: DatePipe) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.refresh();
  }

  ionViewWillLeave() {
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

  // MOSTRA TODOS OS DADOS DA MOVIMENTAÇÃO
  async mostraMovimento(movimento: Movimentacao) {

    const data = this.datepipe.transform(movimento.data, 'dd/MM/yyyy');

    const alert1 = await this.alertCtrl.create({
      inputs: [
        {
          type: 'text',
          value: 'ID: ' + movimento.id
        },
        {
          label: 'Descrição',
          type: 'text',
          value: 'Descrição: ' +  movimento.descricao
        },
        {
          label: 'Tipo',
          type: 'text',
          value: 'Tipo: ' +  movimento.tipo
        },
        {
          label: 'Valor',
          type: 'text',
          value: 'R$ ' + movimento.valor
        },
        {
          label: 'Data',
          type: 'text',
          value: data
        },
        {
          label: 'Caixa',
          type: 'text',
          value: 'Caixa: ' +  movimento.caixa
        },
      ],
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            return; }
        }
      ]
    });
    await alert1.present();
  }

  // CHAMA O MODAL PARA ATUALIZAÇÃO
  async update(movimento: Movimentacao) {

    const modal1 = await this.modalCtrl.create({
      component: ModalMovimentoPage,
      componentProps: {
        registro: movimento
      }
    });
    await modal1.present();
  }

  // EXCLUIR A MOVIMENTAÇÃO
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

import { Movimentacao } from './../../domains/movimentacao';
import { StorageService } from 'src/app/services/storage/storage.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalController, ToastController, AlertController, NavParams, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Caixa } from 'src/app/domains/caixa';

@Component({
  selector: 'app-modal-movimento',
  templateUrl: './modal-movimento.page.html',
  styleUrls: ['./modal-movimento.page.scss'],
})
export class ModalMovimentoPage implements OnInit {

  movimentoForm: FormGroup;

  movimento: Movimentacao;
  caixas: Caixa[];
  caixaAtual = '';
  ehupdate = false;

  tipos = [
    {
      desc: 'Entrada',
      valor: 'E'
    },
    {
      desc: 'Saída',
      valor: 'S'
    }
  ];

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private storage: StorageService) {
    this.movimentoForm = this.formBuilder.group({
      tipo: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required),
      data: new FormControl('', Validators.required),
      caixa: new FormControl('', Validators.required),
      id: new FormControl()
    });
  }

  ngOnInit() {
    this.storage.getAll('caixas')
      .then((result: Caixa[]) => {
        this.caixas = result;
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
    } else {
      this.caixaAtual = 'Não existe.';
    }

  }

  add() {
    const formMovimento = this.movimentoForm.value;
    // const data = this.datepipe.transform(formMovimento.data, 'dd/MM/yyyy');
    // formMovimento.data = data;

    if (this.ehupdate) {
      this.storage
        .update(formMovimento, 'movimentacoes')
        .then(() => {
          this.showToast('Movimentação atualizada com sucesso!');
          this.navCtrl.navigateRoot('home');
          this.fechar();
        })
        .catch((error: Error) => {
          this.showError(error);
        });
    } else {
      formMovimento.id = Date.now();
      this.storage
        .add(formMovimento, 'movimentacoes')
        .then(() => {
          this.showToast('Movimentação adicionada com sucesso!');
          this.fechar();
        })
        .catch((error: Error) => {
          this.showError(error);
        });
      }

    this.ehupdate = false;
    }

fechar() {
  this.modalCtrl.dismiss();
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

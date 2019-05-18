import { StorageService } from 'src/app/services/storage/storage.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Caixa } from 'src/app/domains/caixa';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-movimento',
  templateUrl: './modal-movimento.page.html',
  styleUrls: ['./modal-movimento.page.scss'],
})
export class ModalMovimentoPage implements OnInit {

  movimentoForm: FormGroup;

  caixas: Caixa[];
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

  constructor(private modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              private storage: StorageService,
              private datepipe: DatePipe) {
    this.movimentoForm = this.formBuilder.group({
      tipo: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required),
      data: new FormControl('', Validators.required),
      caixa: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.storage.getAll('caixas')
      .then((result: Caixa[]) => {
        this.caixas = result;
      });
  }

  add() {
    const formMovimento = this.movimentoForm.value;
    this.storage
      .ehDuplicado('movimentos', formMovimento.descricao)
      .then(duplicado => {
        if (duplicado) {
          this.showError('Não pode existir dois movimentos como mesmo nome!');
        } else {

          formMovimento.id = Date.now();
          const data = this.datepipe.transform(formMovimento.data, 'dd/MM/yyyy');
          formMovimento.data = data;

          this.storage
            .add(formMovimento, 'movimentos')
            .then(() => {
              this.showToast('Movimento adicionado com sucesso!');
              this.fechar();
            })
            .catch((error: Error) => {
              this.showError(error);
            });
        }
      });

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

import { StorageService } from 'src/app/services/storage/storage.service';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { Caixa } from 'src/app/domains/caixa';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-modal-caixa',
  templateUrl: './modal-caixa.page.html',
  styleUrls: ['./modal-caixa.page.scss'],
})
export class ModalCaixaPage implements OnInit {

  caixaForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private storage: StorageService) {
    this.caixaForm = this.formBuilder.group({
      descricao: new FormControl('', Validators.required),
      saldoInicial: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  // ADICIONA NOVO CAIXA
  add() {
    const formCaixa = this.caixaForm.value; // PEGO OS DADOS DO FORMULARIO
    this.storage
      .ehDuplicado('caixas', formCaixa.descricao)
      .then(duplicado => {
        if (duplicado) {
          this.showError('Não pode existir dois caixas como mesmo nome!');
        } else {
          formCaixa.id = Date.now();
          this.storage
            .add(formCaixa, 'caixas')
            .then(() => {
              this.showToast('Caixa adicionado com sucesso!');
              this.fechar();
            })
            .catch((error: Error) => {
              this.showError(error);
            });
        }
      });
  }

  // FECHA O MODAL
  fechar() {
    this.modalCtrl.dismiss();
  }

  // METODOS DE MENSAGEM AO USUARIO
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

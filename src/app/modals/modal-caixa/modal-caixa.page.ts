import { ModalController } from '@ionic/angular';
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
              private modalCtrl: ModalController) {
    this.caixaForm = this.formBuilder.group({
      descricao: new FormControl('', Validators.required),
      saldoInicial: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  add() {
    const formCaixa = this.caixaForm.value; // PEGO OS DADOS DO FORMULARIO
  }

  fechar() {
    this.modalCtrl.dismiss();
  }

}

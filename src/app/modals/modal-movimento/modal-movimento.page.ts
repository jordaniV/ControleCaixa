import { StorageService } from 'src/app/services/storage/storage.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Caixa } from 'src/app/domains/caixa';

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
              private formBuilder: FormBuilder,
              private storage: StorageService) {
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

  }

  fechar() {
    this.modalCtrl.dismiss();
  }

}

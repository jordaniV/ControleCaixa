import { Caixa } from 'src/app/domains/caixa';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-modal-caixa',
  templateUrl: './modal-caixa.page.html',
  styleUrls: ['./modal-caixa.page.scss'],
})
export class ModalCaixaPage implements OnInit {

  form: FormGroup;
  caixa: Caixa;

  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      descricao: ['', Validators.required],
      saldoInicial: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  add() {
    const formCaixa = this.form.value; // PEGO OS DADOS DO FORMULARIO
  }

}

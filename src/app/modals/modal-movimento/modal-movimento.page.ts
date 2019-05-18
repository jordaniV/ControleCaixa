import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-movimento',
  templateUrl: './modal-movimento.page.html',
  styleUrls: ['./modal-movimento.page.scss'],
})
export class ModalMovimentoPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  fechar() {
    this.modalCtrl.dismiss();
  }

}

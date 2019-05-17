import { StorageService } from './../../../services/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { IonList } from '@ionic/angular';
import { Caixa } from 'src/app/domains/caixa';

@Component({
  selector: 'app-lista-caixas',
  templateUrl: './lista-caixas.page.html',
  styleUrls: ['./lista-caixas.page.scss'],
})
export class ListaCaixasPage implements OnInit {

  caixas: Caixa[] = [];

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.storage
        .getAll('caixas')
        .then((result: Caixa[]) => {
          this.caixas = result;
        });
  }

  update(caixa: Caixa) {

  }

  delete(caixa: Caixa) {

  }
}

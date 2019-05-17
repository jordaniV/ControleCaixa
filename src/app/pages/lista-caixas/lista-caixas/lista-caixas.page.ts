import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { Caixa } from 'src/app/domains/caixa';

@Component({
  selector: 'app-lista-caixas',
  templateUrl: './lista-caixas.page.html',
  styleUrls: ['./lista-caixas.page.scss'],
})
export class ListaCaixasPage implements OnInit {

  @ViewChild('lista') lista: IonList;

  caixas: Caixa[] = [];

  constructor() { }

  ngOnInit() {
  }

}

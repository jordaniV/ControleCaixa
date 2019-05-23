import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Caixa } from '../../domains/caixa';
import { Movimentacao } from '../../domains/movimentacao';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  duplicado = false;

  constructor(
    private storage: Storage,
    private datepipe: DatePipe) { }

  getAll(KEY: string): Promise<any> {
    return this.storage
      .get(KEY)
      .then((items: any[]) => {
        return items;
      });
  }

  /*getById(KEY: string, id: number) {
    return this.storage
      .get(KEY)
      .then((items: any[]) => {
        if (!items || items.length === 0) {
          return null;
        }

        const arrayId: any[] = [];

        for (const i of items) {
            arrayId.push(i);
        }
        return arrayId;
      });
  }*/


  getAllAno(KEY: string) {
    return this.storage
      .get(KEY)
      .then((items: Movimentacao[]) => {
        if (!items || items.length === 0) {
          return null;
        }

        const anos: any[] = [];
        let novArr: any[] = [];

        for (const i of items) {
          const ano = this.datepipe.transform(i.data, 'yyyy');
          anos.push(ano);
        }
        // tslint:disable-next-line:only-arrow-functions
        novArr = anos.filter(function (este, ii) {
          return anos.indexOf(este) === ii;
        });
        return novArr;

      });
  }
  getAllByFiltros(KEY: string, filtros: any) {
    return this.storage
      .get(KEY)
      .then((items: Movimentacao[]) => {
        if (!items || items.length === 0) {
          return null;
        }

        const dadosFiltrados: Movimentacao[] = [];

        for (const i of items) {
          const ano = this.datepipe.transform(i.data, 'yyyy');
          const mes = this.datepipe.transform(i.data, 'MM');
          const caixa = i.caixa;

          if (ano === filtros.ano && mes === filtros.mes && caixa === filtros.caixa) {
            dadosFiltrados.push(i);
            console.log(dadosFiltrados);
          } else { }
        }
        return dadosFiltrados;
      });
  }

  add(array: any, KEY: string): Promise<any> {
    return this.storage
      .get(KEY)
      .then((items: any[]) => {
        if (items) {
          items.push(array);
          return this.storage.set(KEY, items);
        } else {
          return this.storage.set(KEY, [array]);
        }
      });
  }

  update(array: any, KEY: string): Promise<any> {
    return this.storage
      .get(KEY)
      .then((items: any[]) => {
        if (!items || items.length === 0) {
          return null;
        }

        const novosItems: any[] = [];

        for (const i of items) {
          if (i.id === array.id) {
            novosItems.push(array);
          } else {
            novosItems.push(i);
          }
        }

        return this.storage.set(KEY, novosItems);
      });
  }

  delete(id: number, KEY: string): Promise<any> {
    return this.storage
      .get(KEY)
      .then((items: any[]) => {
        if (!items || items.length === 0) {
          return null;
        }

        const toKeep: any[] = [];

        for (const i of items) {
          if (i.id !== id) {
            toKeep.push(i);
          }
        }

        return this.storage.set(KEY, toKeep);
      });
  }

  ehDuplicado(KEY: string, desc: string): Promise<boolean> {

    return this.storage
      .get(KEY)
      .then((items: any[]) => {
        if (!items || items.length === 0) {
          return;
        }

        for (const i of items) {
          if (i.descricao === desc) {
            this.duplicado = true;
            break;
          } else {
            this.duplicado = false;
          }
        }

        return this.duplicado;
      });
  }
}

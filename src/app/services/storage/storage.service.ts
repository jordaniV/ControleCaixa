import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Caixa } from '../../domains/caixa';
import { Movimentacao } from '../../domains/movimentacao';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  duplicado = false;

  constructor(private storage: Storage) { }

  getAll(KEY: string): Promise<any> {
    return this.storage
              .get(KEY)
              .then((items: Caixa[]) => {
                return items;
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

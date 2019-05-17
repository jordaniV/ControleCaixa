import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMovimentacoesPage } from './lista-movimentacoes.page';

describe('ListaMovimentacoesPage', () => {
  let component: ListaMovimentacoesPage;
  let fixture: ComponentFixture<ListaMovimentacoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMovimentacoesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMovimentacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

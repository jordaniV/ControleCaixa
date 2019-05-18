import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCaixaPage } from './modal-caixa.page';

describe('ModalCaixaPage', () => {
  let component: ModalCaixaPage;
  let fixture: ComponentFixture<ModalCaixaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCaixaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCaixaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

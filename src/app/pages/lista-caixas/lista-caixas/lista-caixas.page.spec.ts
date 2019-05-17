import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCaixasPage } from './lista-caixas.page';

describe('ListaCaixasPage', () => {
  let component: ListaCaixasPage;
  let fixture: ComponentFixture<ListaCaixasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCaixasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCaixasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

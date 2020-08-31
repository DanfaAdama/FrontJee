import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteProduitComponent } from './modal-delete-produit.component';

describe('ModalDeleteProduitComponent', () => {
  let component: ModalDeleteProduitComponent;
  let fixture: ComponentFixture<ModalDeleteProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

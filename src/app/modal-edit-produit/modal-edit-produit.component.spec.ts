import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditProduitComponent } from './modal-edit-produit.component';

describe('ModalEditProduitComponent', () => {
  let component: ModalEditProduitComponent;
  let fixture: ComponentFixture<ModalEditProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

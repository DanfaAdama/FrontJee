import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteCategorieComponent } from './modal-delete-categorie.component';

describe('ModalDeleteCategorieComponent', () => {
  let component: ModalDeleteCategorieComponent;
  let fixture: ComponentFixture<ModalDeleteCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

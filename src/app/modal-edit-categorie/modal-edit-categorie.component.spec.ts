import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditCategorieComponent } from './modal-edit-categorie.component';

describe('ModalEditCategorieComponent', () => {
  let component: ModalEditCategorieComponent;
  let fixture: ComponentFixture<ModalEditCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

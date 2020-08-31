import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustumersComponent } from './edit-custumers.component';

describe('EditCustumersComponent', () => {
  let component: EditCustumersComponent;
  let fixture: ComponentFixture<EditCustumersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCustumersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustumersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-edit-produit',
  templateUrl: './modal-edit-produit.component.html',
  styleUrls: ['./modal-edit-produit.component.scss']
})
export class ModalEditProduitComponent implements OnInit {

  @Input() public datas;
  @Output() public passEntry = new EventEmitter();
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  update()
  {
      this.passEntry.emit(this.datas);
      this.activeModal.close();
  }
}

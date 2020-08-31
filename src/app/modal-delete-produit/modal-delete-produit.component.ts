import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-delete-produit',
  templateUrl: './modal-delete-produit.component.html',
  styleUrls: ['./modal-delete-produit.component.scss']
})
export class ModalDeleteProduitComponent implements OnInit {

  @Input() public data;
  @Output() public passEntry = new EventEmitter();
  constructor(public activeModal: NgbActiveModal) { }



  ngOnInit(): void {
  }
  deletep()
  {
      this.passEntry.emit(this.data);
      this.activeModal.close();
  }

}

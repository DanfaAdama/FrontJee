import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-delete-categorie',
  templateUrl: './modal-delete-categorie.component.html',
  styleUrls: ['./modal-delete-categorie.component.scss']
})
export class ModalDeleteCategorieComponent implements OnInit {
  @Input() public data;
  @Output() public passEntry = new EventEmitter();
  constructor(public activeModal: NgbActiveModal) { }



  ngOnInit(): void {
  }
  delete()
  {
      this.passEntry.emit(this.data);
      this.activeModal.close();
  }

}

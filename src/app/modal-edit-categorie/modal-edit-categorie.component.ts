import { Component, OnInit , Input, Output,EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-edit-categorie',
  templateUrl: './modal-edit-categorie.component.html',
  styleUrls: ['./modal-edit-categorie.component.scss']
})
export class ModalEditCategorieComponent implements OnInit {
  @Input() public data;
  @Output() public passEntry = new EventEmitter();
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  update()
  {
      this.passEntry.emit(this.data);
      this.activeModal.close();
  }




}

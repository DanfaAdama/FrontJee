import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-edit-stock',
  templateUrl: './modal-edit-stock.component.html',
  styleUrls: ['./modal-edit-stock.component.scss']
})
export class ModalEditStockComponent implements OnInit {
  @Input() public datastocks;
  @Output() public passEntry = new EventEmitter();
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  update()
  {
      this.passEntry.emit(this.datastocks);
      this.activeModal.close();
  } 
}

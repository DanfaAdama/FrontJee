import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-custumers',
  templateUrl: './edit-custumers.component.html',
  styleUrls: ['./edit-custumers.component.scss']
})
export class EditCustumersComponent implements OnInit {
  @Input() public custumer;
  @Output() public passEntry = new EventEmitter();
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  update()
  {
      this.passEntry.emit(this.custumer);
      this.activeModal.close();
  }

}

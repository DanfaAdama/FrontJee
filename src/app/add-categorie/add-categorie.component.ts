import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryData } from '../modele/CategoryData';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {
  @Input() public categorie:CategoryData;
  @Output() public passEntry = new EventEmitter();
  constructor(public activeModal: NgbActiveModal) { }


  ngOnInit(): void {
  }
  save()
  {
      this.passEntry.emit(this.categorie);
      this.activeModal.close();
  }
  

}

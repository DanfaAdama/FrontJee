import { ProduitData } from './../modele/ProduitData';
import { RessourceService } from './../ressource.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryData } from '../modele/CategoryData';
import { Ng2ImgMaxService } from "ng2-img-max";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})
export class AddProduitComponent implements OnInit {

  @Input() public produit:ProduitData;
  categories: CategoryData[];
  @Output() public passEntry = new EventEmitter();
  fileToUpload: File;
  uploadedImage: File;
  uploadedImage2: String;
  imagePreview2: string;
  photo: any;
  photoUpdate: any;
  avatar = "assets/img/avatars/empty-img.png";
  constructor(public activeModal: NgbActiveModal,private ressourceservice: RessourceService,private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    // this.ressourceservice.getCategories().
    // subscribe(
    //   res => {
    //     this.categories = res;
    //     console.log(res);
    //   },
    //   err => console.log(err)
    // );


    this.ressourceservice.getCategories().
    subscribe((
      data:CategoryData[]) =>{
       this.categories = data;
        console.log('categories', this.categories);
      });
  }
  save()
  {
      this.passEntry.emit(this.produit);
      this.activeModal.close();
  }
  handleFileInput(files: FileList) { this.fileToUpload = files.item(0); }
   
  onImageChange(event) {
    let image = event.target.files[0];

    this.ng2ImgMax.resizeImage(image, 140, 140).subscribe(
      (result) => {
        this.uploadedImage = new File([result], result.name);
        //this.onImageChange2(this.uploadedImage);
        this.getImagePreview(this.uploadedImage);
        //this.getBase642(this.uploadedImage);
      },
      (error) => {
        console.log(" Oh no!", error);
      }
    );
  }
  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imagePreview: string = reader.result as string;
      this.imagePreview2 = imagePreview;
      this.produit.photoName = imagePreview;
      this.photo = imagePreview;
      console.log("Image resize base64", reader.result);
      console.log("Image lenght", this.imagePreview2.length);
    };
  }
}

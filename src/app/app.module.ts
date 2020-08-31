import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './theme/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { TokenInterceptorService } from './token-interceptor.service';
import {MatIconModule} from '@angular/material/icon';

import { ToggleFullScreenDirective } from './theme/shared/full-screen/toggle-full-screen';

/* Menu Items */
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ModalEditCategorieComponent } from './modal-edit-categorie/modal-edit-categorie.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { ModalDeleteCategorieComponent } from './modal-delete-categorie/modal-delete-categorie.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { ModalEditProduitComponent } from './modal-edit-produit/modal-edit-produit.component';
import { ModalDeleteProduitComponent } from './modal-delete-produit/modal-delete-produit.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { ModalEditStockComponent } from './modal-edit-stock/modal-edit-stock.component';
import { CustumersComponent } from './custumers/custumers.component';
import { EditCustumersComponent } from './edit-custumers/edit-custumers.component';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { DataTablesModule } from 'angular-datatables';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective,
    AccessDeniedComponent,
    ModalEditCategorieComponent,
    AddCategorieComponent,
    ModalDeleteCategorieComponent,
    AddProduitComponent,
    ModalEditProduitComponent,
    ModalDeleteProduitComponent,
    AddStockComponent,
    ModalEditStockComponent,
    CustumersComponent,
    EditCustumersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    HttpClientModule,
    NgSelectModule,
    CommonModule,
    Ng2ImgMaxModule,
    DataTablesModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  providers: [NavigationItem,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

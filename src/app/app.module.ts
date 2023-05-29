import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; // Importe o MatFormFieldModule
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormClientComponent } from './Components/form-client/form-client.component';

import { ClientService } from './Services/client.service';
import { ProviderService } from './Services/provider.service';
import { HttpClientModule } from '@angular/common/http';
import { ListClientComponent } from './Components/list-client/list-client.component';
import { ConfirmationDialogComponent } from './Components/confirmation-dialog/confirmation-dialog.component';
import { FormProviderComponent } from './Components/form-provider/form-provider.component';
import { ListProviderComponent } from './Components/list-provider/list-provider.component';
import { ListRelationshipComponent } from './Components/list-relationship/list-relationship.component';
import { FormRelationshipComponent } from './Components/form-relationship/form-relationship.component';

@NgModule({
  declarations: [
    AppComponent,
    FormClientComponent,
    ListClientComponent,
    ConfirmationDialogComponent,
    FormProviderComponent,
    ListProviderComponent,
    ListRelationshipComponent,
    FormRelationshipComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ModalModule,
    RouterModule,
    MatSelectModule,
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }

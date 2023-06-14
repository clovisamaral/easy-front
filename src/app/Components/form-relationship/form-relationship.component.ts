import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { first, lastValueFrom } from 'rxjs';
import { RelationshipRequest } from 'src/app/Models/RelationshipRequest';
import { ClientService } from 'src/app/Services/client.service';
import { ProviderService } from 'src/app/Services/provider.service';
import { RelationshipService } from 'src/app/Services/relationship.service';

interface DropdownClient {
  id?: number;
  name?: string;
}
interface DropdownProvider {
  id?: number;
  name?: string;
}

@Component({
  selector: 'app-form-relationship',
  templateUrl: './form-relationship.component.html',
  styleUrls: ['./form-relationship.component.css'],
})
export class FormRelationshipComponent {
  formRelationship!: FormGroup;
  title: string;
  dataSource!: MatTableDataSource<any>;
  isActive: boolean = false;
  isExtract: boolean = false;
  selectedClient: any;
  selectedProvider: any;
  clients: DropdownClient[] = [];
  providers: DropdownProvider[] = [];

  currentClient: any;
  currentProvider: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private relationshipService: RelationshipService,
    private clientService: ClientService,
    private providerService: ProviderService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<FormRelationshipComponent>,
    @Inject(MAT_DIALOG_DATA) public dataClients: any,
    @Inject(MAT_DIALOG_DATA) public dataProviders: any
  ) {
    this.title = '';
  }

  onClientSelectionChange(selectedValue: string) {
    console.log(`client selected: ${selectedValue}`);
  }
  onProviderSelectionChange(selectedValue: string) {
    console.log(`provider selected: ${selectedValue}`);
  }

  ngOnInit(): void {
    this.title = 'New Relationship';

    this.formRelationship = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      active: new FormControl(),
      clientName: new FormControl(),
      providerName: new FormControl(),
      identifierCode: new FormControl('', [Validators.required]),
      billingType: new FormControl('', [Validators.required]),
      contractValue: new FormControl('', [Validators.required]),
      extract: new FormControl(),
    });

    this.LoadClients();
    this.LoadProviders();

    this.isExtract = false;
    this.isActive = false;

    this.formRelationship.patchValue(this.dataClients);
    this.formRelationship.patchValue(this.dataProviders);
  }

  onSubmit() {
    if (this.formRelationship.valid) {
      if (this.dataClients && this.dataProviders) {
        this.relationshipService.Put(this.formRelationship.value).subscribe({
          next: (val: any) => {
            this.toastr.success(
              'Relationship edited successfully',
              'Relationship'
            );
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            this.toastr.error(err, 'Relationship');
          },
        });
      } else {
        const relations = new RelationshipRequest();
        relations.name = this.formRelationship.value.name;
        relations.providerName = this.formRelationship.value.providerName;
        relations.identifierCode = this.formRelationship.value.identifierCode;
        relations.billing = this.formRelationship.value.billingType;
        relations.contractValue = this.formRelationship.value.contractValue;
        relations.extract = this.formRelationship.value.extractDoc;
        relations.clientName = this.formRelationship.value.clientName;
        relations.active = this.formRelationship.value.active;

        this.relationshipService.Post(relations).subscribe({
          next: (val: any) => {
            this.toastr.success(
              'Relationship inserted successfully',
              'Relationship'
            );
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            this.toastr.error(err, 'Relationship');
          },
        });
      }
    }
  }

  LoadClients() {
    this.clientService.GetAll(false).subscribe({
      next: (res: any[]) => {
        this.clients = res;
        this.selectedClient = {
          clientid: this.clients[0].id,
          name: this.clients[0].name,
        };
      },
      error: (err) => {
        this.toastr.error('Error loading data client', 'Client Form');
      },
    });
  }

  LoadProviders() {
    this.providerService.GetAll(false).subscribe({
      next: (res: any[]) => {
        this.providers = res;
        this.selectedProvider = {
          providerid: this.providers[0].id,
          name: this.providers[0].name,
        };
      },
      error: (err) => {
        this.toastr.error('Error loading data client', 'Providert Form');
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Provider } from 'src/app/Models/provider';
import { ProviderService } from 'src/app/Services/provider.service';

@Component({
  selector: 'app-form-provider',
  templateUrl: './form-provider.component.html',
  styleUrls: ['./form-provider.component.css']
})
export class FormProviderComponent {
  formProvider!: FormGroup;
  title: string;
  dataSource!: MatTableDataSource<any>;
  value!: string;
  isActive: boolean=false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private providerService: ProviderService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<FormProviderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = '';
  }

  ngOnInit(): void {
    this.title = 'New Provider';

    this.formProvider = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      urlBase: new FormControl('', [Validators.required]),
      active: new FormControl(false),
    });

    this.formProvider.patchValue(this.data);

    this.isActive = false;
  }

  onSubmit() {
    if (this.formProvider.valid) {
      if (this.data) {
        this.providerService.Put(this.formProvider.value).subscribe({
          next: (val: any) => {
            this.isActive = this.formProvider.value.active;
            this.toastr.success('Provider edited successfully', 'Provider');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            this.toastr.error(err, 'Provider');
          },
        });
      } else {
        const provider = new Provider();
        provider.name = this.formProvider.value.name;
        provider.urlBase = this.formProvider.value.urlBase;
        provider.active = this.formProvider.value.active;

        this.providerService.Post(provider).subscribe({
          next: (val: any) => {
            this.toastr.success('Provider inserted successfully', 'Provider');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            this.toastr.error(err, 'Provider');
          },
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

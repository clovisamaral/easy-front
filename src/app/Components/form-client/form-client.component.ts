import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/Models/client';
import { ClientService } from 'src/app/Services/client.service';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css'],
})
export class FormClientComponent implements OnInit {
  formClient!: FormGroup;
  title: string;
  dataSource!: MatTableDataSource<any>;
  cpf!: string;
  isActive: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clientService: ClientService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<FormClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = '';
  }

  ngOnInit(): void {
    this.title = 'New Client';

    this.formClient = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9]{3}\.){2}[0-9]{3}-[0-9]{2}$/),
      ]),
      active: new FormControl(false),
    });
    this.formClient.patchValue(this.data);

    this.cpf = this.formClient.value.cpf;
  }

  onSubmit() {
    if (this.formClient.valid) {
      if (this.data) {
        this.clientService.Put(this.formClient.value).subscribe({
          next: (val: any) => {
            this.isActive = this.formClient.value.active;
            this.toastr.success('Customer edited successfully', 'Client');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            this.toastr.error(err, 'Client');
          },
        });
      } else {
        const cli = new Client();
        cli.name = this.formClient.value.name;
        cli.email = this.formClient.value.email;
        cli.cpf = this.formClient.value.cpf;
        cli.active = this.formClient.value.active;

        this.clientService.Post(cli).subscribe({
          next: (val: any) => {
            this.toastr.success('Customer inserted successfully', 'Client');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            this.toastr.error(err, 'Client');
          },
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  formatarCpf() {
    if (this.cpf != null) {
      let cpfSemPontos = this.cpf.replace(/\D/g, '');
      if (cpfSemPontos.length === 11) {
        this.cpf = cpfSemPontos.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          '$1.$2.$3-$4'
        );
      } else {
        this.cpf = cpfSemPontos.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3-');
      }
    }
  }
}

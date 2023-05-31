import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/Services/client.service';
import { FormClientComponent } from '../form-client/form-client.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css'],
})
export class ListClientComponent {
  title = 'EasyApp';

  displayedColumns: string[] = [
    'Id',
    'Name',
    'Email',
    'CPF',
    'Active',
    'Action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private serviceClient: ClientService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.bindClients();
  }

  openAddClientForm() {
    const dialogRef = this.dialog.open(FormClientComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.bindClients();
        }
      },
    });
  }

  openEditClientForm(data: any) {
    const dialogRef = this.dialog.open(FormClientComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.bindClients();
        }
      },
    });
  }

  openDeleteConfirmation(id: number) {
    this.dialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (!confirm) return;
        this.deleteClients(id);
      });
  }

  bindClients() {
    this.serviceClient.GetAll().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.toastr.error('Error loading data client', 'Client Form');
      },
    });
  }

  deleteClients(id: number) {
    this.serviceClient.Delete(id).subscribe({
      next: (res) => {
        this.toastr.success('Client deleted.', 'Client Form');
        this.bindClients();
      },
      error: (err) => {
        this.toastr.error('Error deleting client', 'Client Form');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

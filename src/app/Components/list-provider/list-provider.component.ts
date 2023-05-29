import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ProviderService } from 'src/app/Services/provider.service';
import { FormProviderComponent } from '../form-provider/form-provider.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-list-provider',
  templateUrl: './list-provider.component.html',
  styleUrls: ['./list-provider.component.css']
})
export class ListProviderComponent {
  title = 'EasyApp';

  displayedColumns: string[] = [
    'Id',
    'Name',
    'UrlBase',
    'IdentifierCode',
    'Billing',
    'ContractValue',
    'Extract',
    'Active',
    'Action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private serviceProvider: ProviderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.bindProviders();
  }

  openAddProviderForm() {
    const dialogRef = this.dialog.open(FormProviderComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.bindProviders();
        }
      },
    });
  }

  openEditProviderForm(data: any) {
    const dialogRef = this.dialog.open(FormProviderComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.bindProviders();
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
        this.deleteProviders(id);
      });
  }

  bindProviders() {
    this.serviceProvider.GetAll().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.toastr.error('Error loading data provider', 'Provider Form');
      },
    });
  }

  deleteProviders(id: number) {
    this.serviceProvider.Delete(id).subscribe({
      next: (res) => {
        this.toastr.success('Provider deleted.', 'Provider Form');
        this.bindProviders();
      },
      error: (err) => {
        this.toastr.error('Error deleting provider', 'Provider Form');
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

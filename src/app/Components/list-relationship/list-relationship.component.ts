import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { FormRelationshipComponent } from '../form-relationship/form-relationship.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RelationshipService } from 'src/app/Services/relationship.service';

@Component({
  selector: 'app-list-relationship',
  templateUrl: './list-relationship.component.html',
  styleUrls: ['./list-relationship.component.css'],
})
export class ListRelationshipComponent {
  title = 'EasyApp';

  displayedColumns: string[] = [
    'Id',
    'Name',
    'ProviderName',
    'IdentifierCode',
    'BillingType',
    'ContractValue',
    'Extract',
    'ClientName',
    'CPF',
    'Email',
    'Active',
    'Action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private serviceRelationship: RelationshipService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.bindRelations();
  }

  openAddRelationsForm() {
    const dialogRef = this.dialog.open(FormRelationshipComponent);

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.bindRelations();
        }
      },
    });
  }

  openEditRelationsForm(data: any) {
    const dialogRef = this.dialog.open(FormRelationshipComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.bindRelations();
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
        this.deleteRelations(id);
      });
  }

  bindRelations() {
    this.serviceRelationship.GetAll().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.toastr.error('Error loading data relation', 'Relationship Form');
      },
    });
  }

  deleteRelations(id: number) {
    this.serviceRelationship.Delete(id).subscribe({
      next: (res) => {
        this.toastr.success('Relation deleted.', 'Relationship Form');
        this.bindRelations();
      },
      error: (err) => {
        this.toastr.error('Error deleting relation', 'Relationship Form');
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

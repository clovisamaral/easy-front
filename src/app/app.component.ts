import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormClientComponent } from './Components/form-client/form-client.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Easy-Front';
  constructor(private dialog: MatDialog, private router: Router){}

  //Dialog Client Form
  openAddClientForm() {
    const dialogRef = this.dialog.open(FormClientComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
        }
      },
    });
  }

  redirectToClients()
  {
    this.router.navigate(['/clients']);
  }

  redirectToProviders()
  {
    this.router.navigate(['/providers']);
  }

  redirectToRelationships()
  {
    this.router.navigate(['/relationships']);
  }
}

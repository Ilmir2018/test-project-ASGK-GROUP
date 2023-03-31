import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { MessageModalComponent } from "./message-modal/message-modal.component";
import { ClientsService } from "src/app/services/clients.service";
import { MatPaginator } from "@angular/material/paginator";
import { ClientDataProfile, ClientsTableData } from "src/app/interfaces";
import { displayedColumns } from "./local-data";
import { Subscription } from "rxjs";
import { NewClientModalComponent } from "./new-client-modal/new-client-modal.component";

@Component({
  selector: "app-clients-page",
  templateUrl: "./clients-page.component.html",
  styleUrls: ["./clients-page.component.scss"],
})
export class ClientsPageComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = displayedColumns;
  private aSub: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialogWindow: MatDialog,
    public clientsService: ClientsService
  ) {}

  ngOnInit(): void {
    this.aSub = this.clientsService
      .getAllUsers()
      .subscribe((clients: ClientDataProfile[]) => {
        this.clientsService.dataClients =
          new MatTableDataSource<ClientsTableData>(clients);
        this.clientsService.dataClients.sort = this.sort;
        this.clientsService.dataClients.paginator = this.paginator;
      });
  }

  messageDialog(rowElement: ClientDataProfile): void {
    const dialogRef = this.dialogWindow.open(MessageModalComponent, {
      data: {
        id: rowElement.id,
        first_name: rowElement.first_name,
      },
    });
    dialogRef.afterClosed().subscribe();
  }

  newClientDialog() {
    const dialogRef = this.dialogWindow.open(NewClientModalComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe();
  }

  applyFilter(filterValue: string): void {
    this.clientsService.dataClients.filter = filterValue.trim().toLowerCase();
  }

  exitFromPage(): void {
    this.authService.logout();
    this.router.navigate([""]);
  }

  trackByFn(index: number): number {
    return index;
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}

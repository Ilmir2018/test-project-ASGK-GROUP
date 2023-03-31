import { Component, Inject, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { ClientDataProfile, ClientsTableData } from "src/app/interfaces";
import { ClientsService } from "src/app/services/clients.service";
import { displayedColumns } from "./../local-data";

@Component({
  selector: "app-new-client-modal",
  templateUrl: "./new-client-modal.component.html",
  styleUrls: ["./new-client-modal.component.scss"],
})
export class NewClientModalComponent implements OnDestroy {
  createClientForm: FormGroup;
  private aSub: Subscription;
  fields: string[] = displayedColumns;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
    public dialogRef: MatDialogRef<NewClientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public newData: ClientsTableData
  ) {
    this.createForm();
  }

  createForm() {
    this.createClientForm = this.fb.group({
      uuid: ["", [Validators.required, Validators.maxLength(15)]],
      first_name: ["", [Validators.required, Validators.maxLength(15)]],
      last_name: ["", [Validators.required, Validators.maxLength(15)]],
      age: [
        "",
        [Validators.required, Validators.minLength(1), Validators.maxLength(3)],
      ],
      email: [
        "",
        [Validators.required, Validators.minLength(10), Validators.email],
      ],
      city: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      birthday: ["", [Validators.required, Validators.maxLength(10)]],
      phone: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(20),
        ],
      ],
      salary: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      card_number: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.createClientForm.controls[fieldName];
    if (field.hasError("required")) {
      return "You must enter a value";
    } else if (field.hasError("maxlength")) {
      return `Maximum length is ${field.errors?.["maxlength"].requiredLength}`;
    } else if (field.hasError("mminlength")) {
      return `Minimum length is ${field.errors?.["minlength"].requiredLength}`;
    } else if (field.hasError("email")) {
      return `Value must be email like name@example.com`;
    }
    return "";
  }

  onNoClick(event: Event): void {
    this.dialogRef.close();
    event?.preventDefault();
  }

  createClient(): void {
    this.clientsService
      .createClient(this.createClientForm.value)
      .subscribe((newClient: ClientDataProfile) => {
        this.clientsService.dataClients.filteredData.push(newClient);
      });
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}

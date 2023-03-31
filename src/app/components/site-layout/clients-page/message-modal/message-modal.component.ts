import { Component, Inject, OnDestroy } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClientsService } from "src/app/services/clients.service";
import { ClientDataProfile, PushData } from "src/app/interfaces";
import { Subscription } from "rxjs";

@Component({
  selector: "app-message-modal",
  templateUrl: "./message-modal.component.html",
  styleUrls: ["./message-modal.component.scss"],
})
export class MessageModalComponent implements OnDestroy {
  messageForm: FormGroup;
  private aSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
    public dialogRef: MatDialogRef<MessageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public pushData: PushData
  ) {
    this.createForm();
  }

  createForm() {
    this.messageForm = this.fb.group({
      message: ["", [Validators.required, Validators.maxLength(200)]],
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.messageForm.controls[fieldName];
    if (field.hasError("required")) {
      return "You must enter a value";
    } else if (field.hasError("maxlength")) {
      return `Maximum length is ${field.errors?.["maxlength"].requiredLength}`;
    }
    return "";
  }

  onNoClick(event: Event): void {
    this.dialogRef.close();
    event?.preventDefault();
  }

  pushMessage(): void {
    this.aSub = this.clientsService.getClient(this.pushData.id).subscribe(
      (client: ClientDataProfile) => {
        if (client.messages !== undefined) {
          client.messages.push(this.messageForm.value.message);
        } else {
          client["messages"] = [];
          client["messages"].push(this.messageForm.value.message);
        }
        this.clientsService
          .pushMessageForClient(this.pushData.id, client)
          .subscribe();
        this.dialogRef.close();
      },
      (error: any) => console.error(error)
    );
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}

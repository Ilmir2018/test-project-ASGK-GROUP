import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-auth-layout",
  templateUrl: "./auth-layout.component.html",
  styleUrls: ["./auth-layout.component.scss"],
})
export class AuthLayoutComponent implements OnDestroy {
  loginForm: FormGroup;
  private aSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.createForm();

    this.route.queryParams.subscribe((params: Params) => {
      if (params["accessDenied"]) {
        console.log("Для начала авторизуйтесь в системе.");
      } else if (params["sessionFailed"]) {
        console.log("Пожалуйста, войдите в систему заново");
      }
    });
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      login: ["", [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.controls[fieldName];
    if (field.hasError("required")) {
      return "You must enter a value";
    } else if (field.hasError("minlength")) {
      return `Minimum length is ${field.errors?.["minlength"].requiredLength}`;
    }
    return "";
  }

  login(): void {
    this.loginForm.disable();
    this.aSub = this.authService.login(this.loginForm.value).subscribe(
      () => {
        this.router.navigate(["/clients"]);
      },
      (e) => {
        console.log(e);
        this.loginForm.enable();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}

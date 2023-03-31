import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "test-project-ASKG-GROUP";

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const potentialToken = localStorage.getItem("auth_token");
    if (potentialToken !== null) {
      this.authService.setToken(potentialToken);
    }
  }
}

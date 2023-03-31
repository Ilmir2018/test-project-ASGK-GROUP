import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { User } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private token: string | null;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<{ auth_token: string }> {
    return this.http
      .post<{ auth_token: string }>(
        "https://api.asgk-group.ru/test-auth-only",
        user
      )
      .pipe(
        tap(({ auth_token }) => {
          localStorage.setItem("auth_token", auth_token);
          this.setToken(auth_token);
        })
      );
  }

  setToken(token: string | null) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ClientDataProfile, ClientsTableData } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class ClientsService {
  dataClients: MatTableDataSource<ClientsTableData>;

  constructor(private http: HttpClient) {}

  getClient(clientId: number): Observable<ClientDataProfile> {
    return this.http
      .get<ClientDataProfile>(environment.host + `/users/${clientId}`)
      .pipe(
        catchError((error) => {
          console.error("An error occurred:", error);
          return throwError(
            () => new Error("Something went wrong; please try again later.")
          );
        })
      );
  }

  getAllUsers(): Observable<ClientDataProfile[]> {
    return this.http.get<ClientDataProfile[]>(environment.host + "/users").pipe(
      catchError((error) => {
        console.error("An error occurred:", error);
        return throwError(
          () => new Error("Something went wrong; please try again later.")
        );
      })
    );
  }

  pushMessageForClient(
    clientId: number,
    clientProfile: ClientDataProfile
  ): Observable<ClientDataProfile> {
    return this.http
      .put<ClientDataProfile>(
        environment.host + `/users/${clientId}`,
        clientProfile
      )
      .pipe(
        catchError((error) => {
          console.error("An error occurred:", error);
          return throwError(
            () => new Error("Something went wrong; please try again later.")
          );
        })
      );
  }

  createClient(clientData: ClientsTableData): Observable<ClientDataProfile> {
    return this.http
      .post<ClientDataProfile>(environment.host + `/users`, clientData)
      .pipe(
        catchError((error) => {
          console.error("An error occurred:", error);
          return throwError(
            () => new Error("Something went wrong; please try again later.")
          );
        })
      );
  }
}

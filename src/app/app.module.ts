import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./modules/material/material.modules";
import { AuthLayoutComponent } from "./components/auth-layout/auth-layout.component";
import { SiteLayoutComponent } from "./components/site-layout/site-layout.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { MessageModalComponent } from "./components/site-layout/clients-page/message-modal/message-modal.component";
import { CommonModule } from "@angular/common";
import { ClientsPageComponent } from "./components/site-layout/clients-page/clients-page.component";
import { NewClientModalComponent } from './components/site-layout/clients-page/new-client-modal/new-client-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    ClientsPageComponent,
    MessageModalComponent,
    NewClientModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

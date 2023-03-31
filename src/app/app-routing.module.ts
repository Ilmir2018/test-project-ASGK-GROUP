import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthLayoutComponent } from "./components/auth-layout/auth-layout.component";
import { ClientsPageComponent } from "./components/site-layout/clients-page/clients-page.component";
import { SiteLayoutComponent } from "./components/site-layout/site-layout.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: AuthLayoutComponent,
  },
  {
    path: "",
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [{ path: "clients", component: ClientsPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

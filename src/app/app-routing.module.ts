import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './ui/account/account.component';
import { MenuComponent } from './ui/menu/menu.component';
import { CrearReservaComponent } from './ui/crear-reserva/crear-reserva.component';

const routes: Routes = [
  { path: "", redirectTo: "reservation", pathMatch: "full" },
  { path: "account", component: AccountComponent },
  { path: "home", component: MenuComponent },
  { path: "reservation", component: CrearReservaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

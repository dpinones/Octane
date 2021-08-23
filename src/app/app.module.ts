import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from "./app-material.module";
import { AccountComponent } from './ui/account/account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HistorialReservaComponent } from './ui/historial-reserva/historial-reserva.component';
import { DatosReservaComponent } from './ui/datos-reserva/datos-reserva.component';
import { CrearReservaComponent } from './ui/crear-reserva/crear-reserva.component';
import { MenuComponent } from './ui/menu/menu.component';
import { HeaderComponent } from './ui/header/header.component';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    HistorialReservaComponent,
    DatosReservaComponent,
    CrearReservaComponent,
    MenuComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

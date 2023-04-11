import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ListaEmpleoComponent } from './empleo/lista-empleo.component';
import { NuevoEmpleoComponent } from './empleo/nuevo-empleo.component';
import { EditarEmpleoComponent } from './empleo/editar-empleo.component';
import { DetalleEmpleoComponent } from './empleo/detalle-empleo.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaEmpleoComponent,
    NuevoEmpleoComponent,
    EditarEmpleoComponent,
    DetalleEmpleoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

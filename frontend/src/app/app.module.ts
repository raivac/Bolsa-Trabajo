import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaEmpleoComponent } from './empleo/lista-empleo.component';
import { NuevoEmpleoComponent } from './empleo/nuevo-empleo.component';
import { EditarEmpleoComponent } from './empleo/editar-empleo.component';
import { DetalleEmpleoComponent } from './empleo/detalle-empleo.component';
import { PoliticaComponent } from './empleo/politica.component';
import { MenuComponent } from './menu/menu.component';
import { LoginCandidatoComponent } from './auth/login-candidato.component';
import { LoginEmpresaComponent } from './auth/login-empresa.component';
import { RegistroEmpresaComponent } from './auth/registro-empresa.component';
import { RegistroCandidatoComponent } from './auth/registro-candidato.component';
import { interceptorProvider } from './interceptors/empleo.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    ListaEmpleoComponent,
    NuevoEmpleoComponent,
    EditarEmpleoComponent,
    DetalleEmpleoComponent,
    PoliticaComponent,
    MenuComponent,
    LoginCandidatoComponent,
    LoginEmpresaComponent,
    RegistroEmpresaComponent,
    RegistroCandidatoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

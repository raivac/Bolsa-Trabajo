import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaEmpleoComponent } from './empleo/lista/lista-empleo.component';
import { NuevoEmpleoComponent } from './empleo/nuevo/nuevo-empleo.component'; 
import { EditarEmpleoComponent } from './empleo/editar/editar-empleo.component'; 
import { DetalleEmpleoComponent } from './empleo/detalle/detalle-empleo.component'; 
import { PoliticaComponent } from './empleo/politica/politica.component'; 
import { MenuComponent } from './menu/menu.component';
import { LoginCandidatoComponent } from './auth/loginCandidato/login-candidato.component';
import { LoginEmpresaComponent } from './auth/loginEmpresa/login-empresa.component';
import { RegistroEmpresaComponent } from './auth/registroEmpresa/registro-empresa.component';
import { RegistroCandidatoComponent } from './auth/registroCandidato/registro-candidato.component';
import { interceptorProvider } from './interceptors/empleo.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MisOfertasComponent } from './empleo/misOfertas/mis-ofertas.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';




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
    RegistroCandidatoComponent,
    MisOfertasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    PaginationModule.forRoot()
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

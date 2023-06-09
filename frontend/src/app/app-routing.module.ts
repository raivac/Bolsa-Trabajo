import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEmpleoComponent } from './empleo/lista/lista-empleo.component';
import { DetalleEmpleoComponent } from './empleo/detalle/detalle-empleo.component';
import { NuevoEmpleoComponent } from './empleo/nuevo/nuevo-empleo.component';
import { EditarEmpleoComponent } from './empleo/editar/editar-empleo.component';
import { PoliticaComponent } from './empleo/politica/politica.component';
import { LoginCandidatoComponent } from './auth/loginCandidato/login-candidato.component';
import { LoginEmpresaComponent } from './auth/loginEmpresa/login-empresa.component';
import { RegistroCandidatoComponent } from './auth/registroCandidato/registro-candidato.component';
import { RegistroEmpresaComponent } from './auth/registroEmpresa/registro-empresa.component';
import { LoginEmpresaGuard } from './guards/login-empresa.guard';
import { LoginCandidatoGuard } from './guards/login-candidato.guard';
import { MisOfertasComponent } from './empleo/misOfertas/mis-ofertas.component';
import { EmpleoGuard } from './guards/empleo.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {path: 'politica', component: PoliticaComponent},
  {path: '', component: ListaEmpleoComponent},
  {path: 'detalle/:id', component: DetalleEmpleoComponent},
  {path: 'nuevo', component: NuevoEmpleoComponent,canActivate: [EmpleoGuard], data:{expectedRol:['empresa']}},
  {path: 'mis-ofertas', component: MisOfertasComponent,canActivate: [EmpleoGuard], data:{expectedRol:['empresa']}},
  {path: 'editar/:id', component: EditarEmpleoComponent, canActivate: [EmpleoGuard,UserGuard], data:{expectedRol:['empresa']}},
  {path: 'login-candidato', component: LoginCandidatoComponent,canActivate:[LoginCandidatoGuard]},
  {path: 'login-empresa', component: LoginEmpresaComponent,canActivate:[LoginEmpresaGuard]},
  {path: 'registro-candidato', component: RegistroCandidatoComponent,canActivate:[LoginCandidatoGuard]},
  {path: 'registro-empresa', component: RegistroEmpresaComponent,canActivate:[LoginEmpresaGuard]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

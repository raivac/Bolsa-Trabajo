import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEmpleoComponent } from './empleo/lista-empleo.component';
import { DetalleEmpleoComponent } from './empleo/detalle-empleo.component';
import { NuevoEmpleoComponent } from './empleo/nuevo-empleo.component';
import { EditarEmpleoComponent } from './empleo/editar-empleo.component';
import { PoliticaComponent } from './empleo/politica.component';
import { LoginCandidatoComponent } from './auth/login-candidato.component';
import { LoginEmpresaComponent } from './auth/login-empresa.component';
import { RegistroCandidatoComponent } from './auth/registro-candidato.component';
import { RegistroEmpresaComponent } from './auth/registro-empresa.component';
import { LoginEmpresaGuard } from './guards/login-empresa.guard';
import { LoginCandidatoGuard } from './guards/login-candidato.guard';
import { MisOfertasComponent } from './empleo/mis-ofertas.component';

const routes: Routes = [
  {path: 'politica', component: PoliticaComponent},
  {path: '', component: ListaEmpleoComponent},
  {path: 'detalle/:id', component: DetalleEmpleoComponent},
  {path: 'nuevo', component: NuevoEmpleoComponent},
  {path: 'mis-ofertas', component: MisOfertasComponent},
  {path: 'editar/:id', component: EditarEmpleoComponent},
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

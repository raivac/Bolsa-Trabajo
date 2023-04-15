import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEmpleoComponent } from './empleo/lista-empleo.component';
import { DetalleEmpleoComponent } from './empleo/detalle-empleo.component';
import { NuevoEmpleoComponent } from './empleo/nuevo-empleo.component';
import { EditarEmpleoComponent } from './empleo/editar-empleo.component';
import { PoliticaComponent } from './empleo/politica.component';

const routes: Routes = [
  {path: 'politica', component: PoliticaComponent},
  {path: '', component: ListaEmpleoComponent},
  {path: 'detalle/:id', component: DetalleEmpleoComponent},
  {path: 'nuevo', component: NuevoEmpleoComponent},
  {path: 'editar/:id', component: EditarEmpleoComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

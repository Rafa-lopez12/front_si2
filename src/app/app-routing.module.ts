import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { IndexUsuarioComponent } from './components/usuario/index-usuario/index-usuario.component';
import { CreateUsuarioComponent } from './components/usuario/create-usuario/create-usuario.component';
// import { IndexModuloComponent } from './components/modulo/index-modulo/index-modulo.component';
// import { EditModuloComponent } from './components/modulo/edit-modulo/edit-modulo.component';
import { EditUsuarioComponent } from './components/usuario/edit-usuario/edit-usuario.component';
// import { CreateModuloComponent } from './components/modulo/create-modulo/create-modulo.component';
import { IndexCarreraComponent } from './components/carrera/index-carrera/index-carrera.component';
import { CreateCarreraComponent } from './components/carrera/create-carrera/create-carrera.component';
import { IndexHorarioComponent } from './components/horario/index-horario/index-horario.component';
import { CreateHorarioComponent } from './components/horario/create-horario/create-horario.component';
import { AuthGuard } from './guards/auth.guard';
import { MateriaCarreraComponent } from './components/carrera/materia-carrera/materia-carrera.component';
import { AddMateriaCarreraComponent } from './components/carrera/add-materia-carrera/add-materia-carrera.component';
// import { IndexEspecialidadComponent } from './components/especialidades/index-especialidad/index-especialidad.component';
import { CreateEspecialidadComponent } from './components/especialidades/create-especialidad/create-especialidad.component';
import { IndexEspecialidadComponent } from './components/especialidades/index-especialidad/index-especialidad.component';
import { IndexPacienteComponent } from './components/pacientes/index-paciente/index-paciente.component';
import { CreatePacienteComponent } from './components/pacientes/create-paciente/create-paciente.component';
import { IndexCitaComponent } from './components/cita/index-cita/index-cita.component';
import { VerHistorialComponent } from './components/cita/ver-historial/ver-historial.component';
// import { IndexCitaComponent } from './components/cita/index-cita/index-cita.component';





const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  
  {path:'usuarios',component:IndexUsuarioComponent,canActivate:[AuthGuard]},
  {path:'usuarios/create',component:CreateUsuarioComponent,canActivate:[AuthGuard]},
  {path:'usuarios/edit/:id',component:EditUsuarioComponent,canActivate:[AuthGuard]},

  {path:'especialidad',component:IndexEspecialidadComponent,canActivate:[AuthGuard]},
  {path:'especialidad/create',component:CreateEspecialidadComponent,canActivate:[AuthGuard]},

  // {path:'modulos',component:IndexModuloComponent,canActivate:[AuthGuard]},
  // {path:'modulos/create',component:CreateModuloComponent,canActivate:[AuthGuard]},
  // {path:'modulos/:id',component:EditModuloComponent,canActivate:[AuthGuard]},

  

  {path:'carrera',component:IndexCarreraComponent,canActivate:[AuthGuard]},
  {path:'carrera/create',component:CreateCarreraComponent,canActivate:[AuthGuard]},
  {path:'carrera/materia/:id',component:MateriaCarreraComponent,canActivate:[AuthGuard]},
  {path:'carrera/materia/addmateria/:id', component:AddMateriaCarreraComponent, canActivate:[AuthGuard]},


  {path:'horario',component:IndexHorarioComponent,canActivate:[AuthGuard]},
  {path:'horario/create',component:CreateHorarioComponent,canActivate:[AuthGuard]},

  {path:'cita',component:IndexCitaComponent,canActivate:[AuthGuard]},
  { path: 'historial/:idPaciente', component: VerHistorialComponent, canActivate: [AuthGuard] },


  {path:'paciente',component:IndexPacienteComponent,canActivate:[AuthGuard]},
  {path:'paciente/create',component:CreatePacienteComponent,canActivate:[AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

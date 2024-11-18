
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule aquí
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Importa HttpClient en lugar de provideHttpClient y withFetch
import { LoginComponent } from './components/login/login.component';
import { IndexUsuarioComponent } from './components/usuario/index-usuario/index-usuario.component';
import { CreateUsuarioComponent } from './components/usuario/create-usuario/create-usuario.component';
import { EditUsuarioComponent } from './components/usuario/edit-usuario/edit-usuario.component';

import { IndexCarreraComponent } from './components/carrera/index-carrera/index-carrera.component';
import { CreateCarreraComponent } from './components/carrera/create-carrera/create-carrera.component';
import { CreateHorarioComponent } from './components/horario/create-horario/create-horario.component';
import { IndexHorarioComponent } from './components/horario/index-horario/index-horario.component';
import { AddMateriaCarreraComponent } from './components/carrera/add-materia-carrera/add-materia-carrera.component';
import { MateriaCarreraComponent } from './components/carrera/materia-carrera/materia-carrera.component';
import { CreateEspecialidadComponent } from './components/especialidades/create-especialidad/create-especialidad.component';
import { IndexEspecialidadComponent } from './components/especialidades/index-especialidad/index-especialidad.component';``
import { IndexPacienteComponent } from './components/pacientes/index-paciente/index-paciente.component';
import { CreatePacienteComponent } from './components/pacientes/create-paciente/create-paciente.component';
import { IndexCitaComponent } from './components/cita/index-cita/index-cita.component';
import { VerHistorialComponent } from './components/cita/ver-historial/ver-historial.component';
import { NgxDropzoneModule } from 'ngx-dropzone';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    DashboardComponent,
    LoginComponent,
    IndexUsuarioComponent,
    CreateUsuarioComponent,
    EditUsuarioComponent,
    IndexCarreraComponent,
    CreateCarreraComponent,
  
    CreateHorarioComponent,
    IndexHorarioComponent,
   
    AddMateriaCarreraComponent,
    MateriaCarreraComponent,
   
    IndexEspecialidadComponent,
    CreateEspecialidadComponent,
    CreatePacienteComponent,
    IndexPacienteComponent,
    IndexCitaComponent,
    VerHistorialComponent,
    // IndexCitaComponent
     
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule,
    ReactiveFormsModule ,
    NgxDropzoneModule
  ],
  providers: [
    provideClientHydration(),
    { provide: HttpClient, useClass: HttpClient } // Usa HttpClient directamente y proporciona la clase HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

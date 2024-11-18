  import { Component } from '@angular/core';
  import { UsuarioService } from '../../../services/usuario.service';
  declare var toastr: any;
  @Component({
    selector: 'app-index-paciente',
    templateUrl: './index-paciente.component.html',
    styleUrl: './index-paciente.component.css'
  })
  export class IndexPacienteComponent {
    public token = localStorage.getItem('token');

      public usuarios: Array<any> = [];
      public page=1
      public pageSize=8
      public btn_state_load=false
      public load_data=true
      constructor(
        private usuarioService: UsuarioService
      ){}
      ngOnInit(): void {
            this.iniciarDatos(); // Carga los usuarios desde el servicio
      }

      
      iniciarDatos() {
        this.usuarioService.getUsuarios(this.token).subscribe(
          response => {
            console.log('Usuarios cargados:', response);
            this.usuarios = response.filter((usuario: any) => usuario.rol?.id === 3);
            console.log('Usuarios filtrados:', this.usuarios);
            this.load_data = false;  // Deja de mostrar el spinner
          },
          error => {
            console.log('Error al cargar usuarios:', error);
            this.load_data = false;  // Deja de mostrar el spinner también en caso de error
          }
        );
      }
      
        
  }



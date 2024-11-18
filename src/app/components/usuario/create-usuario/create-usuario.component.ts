import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { Router } from '@angular/router';
declare var toastr:any
@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrl: './create-usuario.component.css'
})
export class CreateUsuarioComponent {
  
 
  public usuario:any={}

  public token=localStorage.getItem('token')
  public btn_load=false
  public roles:any=[]
  public especialidades:Array<any> = [];
  
  public :any=[]
 
  constructor(
    private usuarioService: UsuarioService,
    private especialidadService: EspecialidadService,
    private _router:Router,
    
  ){}
  public especialidadSeleccionado: string | number = ''; // Este es el "nro_registro" del médico
  ngOnInit(){
   this.initData()
   this.usuario.id_rol = 2;
  }

  initData(){
 
      this.especialidadService.getEspecialidad(this.token).subscribe(
      response=>{
        
        this.especialidades=response

        console.log("especialidades" + this.especialidades)
      },
      error => {
        console.error('Error al obtener especialidades:', error); 
      }
    )
  }
  



  registrar() {
    // Verificamos si se ha seleccionado una especialidad
    if (this.especialidadSeleccionado) {
      // Asignamos el id de la especialidad al objeto usuario
      this.usuario.id_especialidad = this.especialidadSeleccionado;
    } else {
      toastr.error('Por favor, selecciona una especialidad.');
      return;  // Salimos de la función si no se ha seleccionado especialidad
    }
  
    console.log(this.usuario);  // Verifica que se esté enviando el objeto correcto
  
    // Enviar al backend
    this.usuario.password = this.usuario.ci;  // Asignamos la contraseña al CI
    this.usuarioService.createUsuario(this.usuario, this.token).subscribe(
      response => {
        console.log(response);
        toastr.success('Usuario creado correctamente');
        // Aquí puedes redirigir a otro lugar o limpiar el formulario
      },
      error => {
        console.error('Error al crear usuario', error);
        toastr.error('Hubo un error al crear el usuario.');
      }
    );
  }
  
}

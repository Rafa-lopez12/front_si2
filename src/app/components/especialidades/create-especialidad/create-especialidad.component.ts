import { Component,   OnInit } from '@angular/core';
import { EspecialidadService } from '../../../services/especialidad.service';
import { Router } from '@angular/router';
declare var toastr:any

@Component({
  selector: 'app-create-especialidad',
  templateUrl: './create-especialidad.component.html',
  styleUrl: './create-especialidad.component.css'
})
export class CreateEspecialidadComponent {


    public especialidad:any={}
  
    public token=localStorage.getItem('token')
    public btn_load=false
    public nuevaEspecialidad = { nombre: '' }; // Modelo para el formulario de creación
    
    
    constructor(
      
      // private gestionService: GestionService,
      private especialidadService : EspecialidadService,
      private router: Router
      
    ){}
   
  
    ngOnInit(): void {
      // this.cargarTipoPeriodo()
    }


  
  // Método para crear una nueva especialidad
  registrar(){
    this.btn_load=true
    this.especialidadService.createEspecialidad(this.especialidad,this.token).subscribe(
      response=>{
        toastr.success('Gestion creada correctamente')
        this.btn_load=false
        this.router.navigate(['/especialidad'])
      },
      error=>{
        console.log(error)
        this.btn_load=false
        toastr.success('Gestion creada correctamente')
        this.router.navigate(['/especialidad'])
      }
    )
  }

}

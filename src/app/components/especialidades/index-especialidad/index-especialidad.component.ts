import { Component, OnInit } from '@angular/core';
import { EspecialidadService } from '../../../services/especialidad.service';

@Component({
  selector: 'app-index-especialidad',
  templateUrl: './index-especialidad.component.html',
  styleUrls: ['./index-especialidad.component.css'] // Corrección: debe ser "styleUrls" en lugar de "styleUrl"
})
export class IndexEspecialidadComponent implements OnInit {
  public token = localStorage.getItem('token'); // Obtén el token desde el localStorage
  public especialidades: Array<any> = []; // Almacena las especialidades obtenidas
  public nuevaEspecialidad = { nombre: '' }; // Modelo para el formulario de creación
  public page=1
  public pageSize=8
  public btn_state_load=false
  public load_data=true
  public creandoEspecialidad = false; // Indicador de carga para la creación de especialidad

  constructor(private especialidadService: EspecialidadService) {}

  ngOnInit(): void {
    this.obtenerEspecialidades(); // Llama a obtener las especialidades al iniciar
  }

  // Método para obtener todas las especialidades
  obtenerEspecialidades(): void {
    this.especialidadService.getEspecialidad(this.token).subscribe(
      (response) => {
        this.especialidades = response;
        this.load_data = false; // Desactiva el indicador de carga cuando se obtiene la respuesta
      },
      (error) => {
        console.log(error)
      }
    );
  }

}

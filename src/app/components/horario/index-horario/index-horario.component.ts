import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../../../services/materia.service';

@Component({
  selector: 'app-index-horario',
  templateUrl: './index-horario.component.html',
  styleUrls: ['./index-horario.component.css']
})
export class IndexHorarioComponent implements OnInit {
  public token = localStorage.getItem('token');
  public horarios: Array<any> = [];
  public load_data = true; // Flag para mostrar el loader

  constructor(private _materiaService: MateriaService) {}

  ngOnInit() {
    this.getHorarios(); // Cambié getPacientes() a getHorarios() para mayor claridad
  }

  getHorarios() {
    this._materiaService.getHorarios(this.token).subscribe(
      (response) => {
        this.horarios = response;
        console.log(this.horarios);  // Puedes quitar este console.log cuando todo funcione
        this.load_data = false; // Desactivamos el loader
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

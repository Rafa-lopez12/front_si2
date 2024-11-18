import { Component } from '@angular/core';
import { ModuloService } from '../../../services/modulo.service';
import { MateriaService } from '../../../services/materia.service';
import { UsuarioService } from '../../../services/usuario.service';
declare var toastr: any;

@Component({
  selector: 'app-create-horario',
  templateUrl: './create-horario.component.html',
  styleUrls: ['./create-horario.component.css']
})
export class CreateHorarioComponent {
  public token = localStorage.getItem('token');
  public horarioCreate: any = {
    horaInicio: '',  // Cambié a "horaInicio" y "horaFin" como lo piden
    horaFin: '',
    dia: '',
    idMedico: '' // Este será el nro_registro del médico
  };
  public usuarios: Array<any> = [];
 

  public btn_load = false;
  public horario: any = {
    docente: '',  // Se usa para capturar el usuario seleccionado (nro_registro)
    dia: '',
    hora_inicio: '',
    hora_fin: ''
  };

  public diaMap: { [key: string]: string } = {
    'Lunes': 'MONDAY',
    'Martes': 'TUESDAY',
    'Miércoles': 'WEDNESDAY',
    'Jueves': 'THURSDAY',
    'Viernes': 'FRIDAY',
    'Sábado': 'SATURDAY',
    'Domingo': 'SUNDAY'
  };

  public moduloID: any = 0;
  public horarios: Array<any> = [];
  public usuarioSeleccionado: string | number = ''; // Este es el "nro_registro" del médico

  constructor(
    private moduloService: ModuloService,
    private materiaService: MateriaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.iniciarDatos(); // Carga los usuarios desde el servicio
  }

  // registrar() {
  //   // Verificar si los datos están completos antes de enviar
  //   if (this.usuarioSeleccionado && this.horario.dia && this.horario.hora_inicio && this.horario.hora_fin) {
  //     // Preparar los datos a enviar al backend
  //     this.horarioCreate = {
  //       idMedico: this.usuarioSeleccionado, // Este es el nroRegistro del médico seleccionado
  //       dia: this.horario.dia,
  //       horaInicio: this.horario.hora_inicio,  // Cambié el nombre del campo a "horaInicio"
  //       horaFin: this.horario.hora_fin       // Cambié el nombre del campo a "horaFin"
  //     };
  
  //     // Imprimir los datos que se van a enviar
  //     console.log('Datos que se van a enviar al backend:', this.horarioCreate);
  
  //     // Enviar los datos al backend
  //     this.materiaService.createHorario(this.horarioCreate, this.token).subscribe(
  //       response => {
  //         console.log('Respuesta del backend:', response);
  //         toastr.success('Horario creado exitosamente', 'Horario Creado');
  //       },
  //       error => {
  //         console.error('Error al crear horario:', error);
  //         toastr.error('Hubo un error al crear el horario', 'Error');
  //       }
  //     );
  //   } else {
  //     toastr.warning('Por favor, complete todos los campos antes de enviar', 'Campos incompletos');
  //   }
  // }
  

  // Función para agregar un nuevo horario

  registrar() {
    if (this.usuarioSeleccionado && this.horario.dia && this.horario.hora_inicio && this.horario.hora_fin) {
      // Mapea el día seleccionado en español al equivalente en inglés en mayúsculas
      const diaIngles = this.diaMap[this.horario.dia];
      
      this.horarioCreate = {
        idMedico: this.usuarioSeleccionado,
        dia: diaIngles,
        horaInicio: this.horario.hora_inicio,
        horaFin: this.horario.hora_fin
      };

      console.log('Datos que se van a enviar al backend:', this.horarioCreate);

      this.materiaService.createHorario(this.horarioCreate, this.token).subscribe(
        response => {
          toastr.success('Horario creado exitosamente', 'Horario Creado');
        },
        error => {
          toastr.error('Hubo un error al crear el horario', 'Error');
        }
      );
    } else {
      toastr.warning('Por favor, complete todos los campos antes de enviar', 'Campos incompletos');
    }
  }

  add() {
    // Verificar si los campos están completos
    if (this.horario.dia && this.horario.hora_inicio && this.horario.hora_fin) {
      // Agregar el horario a la lista
      this.horarios.push({
        dia: this.horario.dia,
        hora_inicio: this.horario.hora_inicio,
        hora_fin: this.horario.hora_fin
      });

      // Limpiar el formulario
      this.horario = {
        docente: this.usuarioSeleccionado,
        dia: '',
        hora_inicio: '',
        hora_fin: ''
      };

      console.log('Horarios actuales:', this.horarios);
    } else {
      toastr.warning('Por favor, complete todos los campos de horario antes de agregar', 'Campos incompletos');
    }
  }

  // Función para eliminar un horario
  remove(idx: any) {
    this.horarios.splice(idx, 1);
    console.log('Horarios después de quitar:', this.horarios);
  }

  iniciarDatos() {
    this.usuarioService.getUsuarios(this.token).subscribe(
      response => {
        console.log('Usuarios cargados:', response);
        // Filtrar solo los usuarios con rol 2 (supuestamente "médicos")
        this.usuarios = response.filter((usuario: any) => usuario.rol?.id === 2);
        console.log('Usuarios filtrados:', this.usuarios); // Verifica que los usuarios sean correctos
  
        // Si ya hay un médico seleccionado, asignarlo a usuarioSeleccionado
        if (this.usuarioSeleccionado) {
          const usuarioSeleccionado = this.usuarios.find(u => u.nroRegistro === this.usuarioSeleccionado);
          if (usuarioSeleccionado) {
            this.usuarioSeleccionado = usuarioSeleccionado.nroRegistro;
          }
        }
      },
      error => {
        console.log('Error al cargar usuarios:', error);
      }
    );
  }
  
}

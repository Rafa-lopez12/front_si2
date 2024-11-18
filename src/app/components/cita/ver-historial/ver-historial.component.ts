import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-ver-historial',
  templateUrl: './ver-historial.component.html',
  styleUrls: ['./ver-historial.component.css']
  
})
export class VerHistorialComponent implements OnInit {
  public historialForm!: FormGroup;
  private idPaciente: string = '';
  private idHistoria: string = '';  // Variable para guardar el id del historial
  private token: string | null = localStorage.getItem('token');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private uploadService: UploadService
  ) {}

  files: File[] = []; // Para almacenar las imágenes seleccionadas

  ngOnInit(): void {
    this.idPaciente = this.route.snapshot.paramMap.get('idPaciente') || '';
    this.initializeForm();
    this.getHistorial();
  }

  initializeForm() {
    this.historialForm = this.fb.group({
      numero_Historia_Clinica: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      ci: ['', Validators.required],
      vacuna: this.fb.array([]),
      estado: [0],
      frecuencia_cardiaca: [''],
      radiografias: this.fb.array([]), // Array para URLs de las radiografías
      peso: [0],
      altura: [0],
      temperatura_corporal: [''],
      tipo_sangre: [''],
      antecedente_familiar: [''],
      antecedente_personal: this.fb.array([]),
      observaciones: this.fb.array([]),
      alergias: this.fb.array([]),
      fecha_nacimiento: [''],
      IdPaciente: ['']
    });
  }

  getHistorial() {
    if (this.token) {
      this.usuarioService.getByIdHistoryPaciente(this.idPaciente, this.token).subscribe({
        next: (response) => {
          this.idHistoria = response.id;
          this.idPaciente = response.paciente.nroRegistro;

          this.historialForm.patchValue({
            numero_Historia_Clinica: response.numero_Historia_Clinica,
            nombre: response.nombre,
            apellido: response.apellido,
            ci: response.ci,
            estado: response.estado,
            frecuencia_cardiaca: response.frecuencia_cardiaca,
            peso: response.peso,
            altura: response.altura,
            temperatura_corporal: response.temperatura_corporal,
            tipo_sangre: response.tipo_sangre,
            antecedente_familiar: response.antecedente_familiar,
            fecha_Nacimiento: response.fecha_Nacimiento,
            IdPaciente: response.paciente.nroRegistro
          });

          // Agrega las URLs de radiografías al array
          this.setArrayValues('vacuna', response.vacuna);
          this.setArrayValues('radiografias', response.radiografias);
          this.setArrayValues('antecedente_personal', response.antecedente_personal);
          this.setArrayValues('observaciones', response.observaciones);
          this.setArrayValues('alergias', response.alergias);
        },
        error: (error) => {
          console.error('Error al obtener el historial:', error);
        }
      });
    }
  }

  setArrayValues(arrayName: string, values: string[]) {
    const formArray = this.historialForm.get(arrayName) as FormArray;
    formArray.clear();
    values.forEach(value => formArray.push(this.fb.control(value)));
  }

  getFormArrayControls(arrayName: string) {
    return (this.historialForm.get(arrayName) as FormArray).controls;
  }

  addArrayItem(arrayName: string) {
    (this.historialForm.get(arrayName) as FormArray).push(this.fb.control(''));
  }

  removeArrayItem(arrayName: string, index: number) {
    (this.historialForm.get(arrayName) as FormArray).removeAt(index);
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles); // Agrega las imágenes seleccionadas al array de archivos
  }
  
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1); // Elimina la imagen del array
  }
  
  uploadRadiografia() {
    if (this.files.length === 0) return;
  
    const file_data = this.files[0]; // Selecciona el primer archivo (puedes adaptarlo si quieres múltiples)
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'cloudinary-clinica'); // Preset de Cloudinary
    data.append('cloud_name', 'do9p2kjnq'); // Nombre de tu cuenta de Cloudinary
  
    this.uploadService.uploadImg(data).subscribe({
      next: (response) => {
        const imageUrl = response.secure_url;
        (this.historialForm.get('radiografias') as FormArray).push(this.fb.control(imageUrl));
        this.files = []; // Limpia el array de archivos después de la subida
        alert('Radiografía subida con éxito');
      },
      error: (error) => {
        console.error('Error al subir la radiografía:', error);
      }
    });
  }

  actualizarHistorial() {
    if (this.historialForm.valid && this.token) {
      console.log('Valores a enviar en el PUT:', this.historialForm.value);

      this.usuarioService.updateHistorial(this.idHistoria, this.historialForm.value, this.token).subscribe({
        next: () => {
          alert('Historial actualizado con éxito.');
          this.router.navigate(['/cita']);
        },
        error: (error) => {
          console.error('Error al actualizar el historial:', error);
          alert('Error al actualizar el historial.');
        }
      });
    }
  }
}

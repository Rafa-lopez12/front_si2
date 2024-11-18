import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-create-paciente',
  templateUrl: './create-paciente.component.html',
  styleUrls: ['./create-paciente.component.css']
})
export class CreatePacienteComponent {

  excelData: any;  // Almacenará el JSON generado del archivo Excel
  public token = localStorage.getItem('token');

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient
  ) {}

  // Método que se ejecuta cuando se carga un archivo
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.readExcel(file);
    }
  }

  readExcel(file: File): void {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      const wb = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = wb.SheetNames[0];  // Nombre de la primera hoja
      const sheet = wb.Sheets[sheetName];
      
      // Convertir hoja a JSON
      this.excelData = XLSX.utils.sheet_to_json(sheet);

      // Filtrar los registros vacíos
      this.excelData = this.excelData.filter((row: any) => row.nro_registro && row.nro_registro.trim() !== "");

      // Limpiar el campo __rowNum__ (si existe) de cada fila
      this.excelData = this.excelData.map((row: any) => {
        const { __rowNum__, ...cleanedRow } = row; // Eliminar el campo __rowNum__
        
        // Convertir fechas en formato de número de serie de Excel a fecha
        if (row.fechaNacimiento && !isNaN(row.fechaNacimiento)) {
          cleanedRow.fechaNacimiento = this.excelSerialToDate(row.fechaNacimiento);
        }

        return cleanedRow;
      });

      console.log(this.excelData);  // Ver los datos limpios
    };
  }

  // Función para convertir número de serie de Excel a formato de fecha
  excelSerialToDate(serial: number): string {
    const unixEpoch = new Date(1899, 11, 30);  // Excel cuenta desde el 30 de diciembre de 1899
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const date = new Date(unixEpoch.getTime() + serial * millisecondsPerDay);

    // Retornar la fecha en formato YYYY-MM-DD
    return date.toISOString().split('T')[0];  // Ejemplo: 2024-03-15
  }

  // Método para subir el JSON al backend
  uploadExcel(): void {
    if (!this.excelData) return;

    // Subir el JSON limpio al backend
    this.usuarioService.createPaciente(this.excelData, this.token)
      .subscribe({
        next: (response) => {
          console.log('Datos cargados correctamente', response);
        },
        error: (error) => {
          console.error('Error al cargar los datos', error);
        }
      });
  }
}

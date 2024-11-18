import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { response } from 'express';
import { read } from 'fs';
@Component({
  selector: 'app-index-cita',
  templateUrl: './index-cita.component.html',
  styleUrl: './index-cita.component.css'
})
export class IndexCitaComponent {

  public token = localStorage.getItem('token')
  public idUsuario = ' '
  public page=1
  public pageSize=8
  public Citas:Array<any> = [];
  public btn_state_load=false
  public load_data=true
  public selectedCitaId: string = ''; // Para identificar la cita seleccionada para cancelar
  public notificationData: any = {}; // Almacenar datos de la notificación
  public showNotificationForm: boolean = false; // Controlar la visibilidad del formulario
   constructor(
    private usuarioService : UsuarioService
   ){}

   ngOnInit(): void {
    this.getLoginUserId() 
    //this.getCitaById()
    
  }
  
  getLoginUserId(){
    this.usuarioService.getAutenticado(this.token).subscribe(
      response => {
       this.idUsuario = response.nroRegistro
       this.load_data=false
       this.getCitaById()
      }
    )
    

  }

  getCitaById(){
    this.usuarioService.getCitas(this.idUsuario,this.token).subscribe(
      
      response => {
        
        this.Citas = response
        console.log(response)
      }
    )
  }

  cancelarCita(citaId: string) {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas cancelar esta cita?');
    if (confirmDelete) {
      this.showNotificationForm = true; // Muestra el formulario
      this.usuarioService.EliminarCita(citaId, this.token).subscribe({
        next: () => {
          // Actualiza las citas eliminando la cancelada
          this.Citas = this.Citas.filter((cita) => cita.id !== citaId);
          alert('Cita cancelada exitosamente.');
  
          // Configura el formulario para la notificación
          this.selectedCitaId = citaId; // Guarda el ID de la cita cancelada
          this.notificationData = {
            title: '', // Por defecto vacío
            body: ''   // Por defecto vacío
          };
        
        }
        // ,
        // error: (error) => {
        //   console.error('Error al cancelar la cita:', error);
        //   alert('Hubo un error al intentar cancelar la cita.');
        // }
      });
    }
  }

  enviarNotificacion() {
    // Validar que los campos necesarios estén completos
    this.showNotificationForm = false;
    if (!this.notificationData.title || !this.notificationData.body) {
      alert('Por favor completa todos los campos del formulario.');
      return;
    }
  
    const notificationPayload = {
      message: {
        token: 'dmDT6r6lQmm2DCxiD2XEqR:APA91bHdENdvP5iyxGW1h4uixqvT0x8uwbzqeKXs_jirh7gWRGkiVCQ0ICnaaePXzqchPZtausp51xdlkMql2PFg8rti9kHQLiVfDfuy_F4E7Kj75KTj4Y8', // Aquí debe ir el token del receptor de la notificación
        notification: {
          title: this.notificationData.title,
          body: this.notificationData.body
        },
        data: {
          // citaId: this.selectedCitaId, // Información adicional
          // usuarioId: this.idUsuario   // Información del usuario que canceló
        }
      }
    };

    console.log(notificationPayload)
  
    this.usuarioService.PostNotification(notificationPayload, this.token).subscribe({
      next: () => {
        alert('Notificación enviada exitosamente.');
         // Oculta el formulario
        this.notificationData = {}; // Limpia los datos del formulario
      },
      error: (error) => {
        console.error('Error al enviar la notificación:', error);
        alert('Hubo un error al enviar la notificación.');
      }
    });
  }
  
}



import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

declare var toastr:any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {


  public usuario:any={
    username:'',
    password:''
  }

  constructor(
    private _usuarioServices: UsuarioService,
    private _router: Router
  ){}

  ngOnInit(){

  }

  login(){
      if(!this.usuario.username){
          toastr.error("correo es requerido")
      }else if((!this.usuario.password)){
        toastr.error("la contraseña es requerido")
      }else{
        console.log(this.usuario)
        this._usuarioServices.login(this.usuario).subscribe(
          response=>{
            console.log(response)
            if(response.token){
              localStorage.setItem('token',response.token)
              localStorage.setItem('userID',this.usuario.username)
              localStorage.setItem('user',JSON.stringify(response.user))
              if(response.user.id_rol==2 || response.user.id.rol==1)
               {this._router.navigate(['/usuarios'])}
              else if(response.user.id_rol==1){
                this._router.navigate(['/usuarios'])
              } 
              
            
            }
            
          }
          
        )
      }
  }
}

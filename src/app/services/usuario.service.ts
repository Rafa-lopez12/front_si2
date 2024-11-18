import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url=GLOBAL.url
  constructor(
    private  _http: HttpClient
  ) {}

  

  getUsuarios(token:any):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(this.url+'/api/usuario',{headers:headers})
  }
  getAutenticado(token:any):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(this.url+'/auth',{headers:headers})
  }
  getCitas(id: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(`${this.url}/api/cita/${id}`, { headers: headers }); // Aquí concatenamos el ID del usuario
  }

  EliminarCita(id: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.delete(`${this.url}/api/cita/${id}`, { headers: headers });
  }
  updateHistorial(id: string, data: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.put(`${this.url}/api/historia/${id}`, data, { headers });
  }
  getByIdHistoryPaciente(id: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(`${this.url}/api/historia/${id}`, { headers: headers }); // Aquí concatenamos el ID del usuario
  }

  login(data:any):Observable<any>{
    let headers= new HttpHeaders().set('Content-Type','application/json')
    return this._http.post(this.url+'/auth/login',data,{headers:headers})
  }

  createUsuario(data:any,token:any):Observable<any>{
    console.log({data})
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post(this.url+'/api/usuario/create',data,{headers:headers})
  }
  createPaciente(data:any,token:any):Observable<any>{
    console.log({data})
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post(this.url+'/api/usuario/createmulti',data,{headers:headers})
  }
  
  
  
  getRol(token:any):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(this.url+'/api/rol',{headers:headers})
  }


  getUsuario(id:any,token:any):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(this.url+'/api/usuario/'+id,{headers:headers})
  }


  asignarDocenteMateria(data:any,token:any):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post(this.url+'/api/docente-materia/create',data,{headers:headers})
  } 

  obtenerDocenteMateria(id:any,token:any):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(this.url+'/api/docente-materia/materias/'+id,{headers:headers})
  }

  PostNotification(notificationData: any, token:any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Sin el header Authorization
    return this._http.post(`${this.url}/api/noti/send`, notificationData, { headers: headers });
  }

  // EstaAutenticado(){
  //   try {
      
  //       const token:any = localStorage.getItem('token');
  //       const helper= new JwtHelperService();
  //       const decode=helper.decodeToken(token);
  //       if(!token){
  //         localStorage.clear();
  //         return false;
  //       }
  //       if(!decode || decode ==undefined){
  //         localStorage.clear();
  //         return false;
  //       }
    
  //       if(helper.isTokenExpired(token)){
  //         localStorage.clear();
  //         return false;
  //       }
    
      
  //   } catch (error) {
  //     localStorage.clear();
  //     return false;
  //   }
  //   return true;
  // }
  
  EstaAutenticado(): boolean {
    try {
      // Verifica si 'window' y 'localStorage' están disponibles
      if (typeof window === 'undefined' || !localStorage) {
        return false;
      }
  
      const token: any = localStorage.getItem('token');
      const helper = new JwtHelperService();
  
      if (!token) {
        localStorage.clear();
        return false;
      }
  
      const decode = helper.decodeToken(token);
      if (!decode) {
        localStorage.clear();
        return false;
      }
  
      if (helper.isTokenExpired(token)) {
        localStorage.clear();
        return false;
      }
  
    } catch (error) {
      localStorage.clear();
      return false;
    }
    
    return true;
  }
   
}

import { Injectable } from '@angular/core';
import {HostService} from './host.service';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {toFormData} from '../upload-file-validators';
import {File} from '../models/file';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private host:HostService,
              private auth:AuthService,
              private http:HttpClient) { }


  getAllFiles(){
    return this.http.get<File[]>(this.host.host+"/files",{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }
  getFile(idFile:string){
    return this.http.get<File>(this.host.host+"/files/"+idFile,{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }
  uploadFile(values:object){
    return this.http.post(this.host.host+"/files", toFormData(values), {
      reportProgress: true,
      observe: 'events',
      headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})
    })
  }
  DeleteFile(idFile:number){
    return this.http.delete(this.host.host+"/files/"+idFile.toString(),{headers:new HttpHeaders(
        {'Authorization':'Bearer '+this.auth.loadToken()})})
  }
}

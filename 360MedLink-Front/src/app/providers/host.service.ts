import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostService {
  public host:string ="http://localhost:9090";
  constructor() { }
}

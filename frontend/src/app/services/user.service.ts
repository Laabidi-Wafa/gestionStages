import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  role:boolean= false;
  constructor() {
     
   }

  setRole(role:boolean){
    this.role=role;
  }

  getRole(){
    return this.role;
  }
}

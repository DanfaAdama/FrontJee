import { RoleData, IRole } from './RoleData';

export interface IUser{
 id?: number;
   name?: string;
 username? :string;
   prenom? : string;
   tel?:string;
   adresse?: string;
   email?:string;
   datenaissance?:string;
   cni?: string;
   sexe?: string;
   roles?: any
   password?:string;
   id_role?:any;
}
export class CustumerData implements IUser {
constructor(
  public id?: number,
  public name?: string,
  public username? :string,
  public prenom? : string,
  public tel?:string,
  public adresse?: string,
  public email?:string,
  public datenaissance?:string,
  public cni?: string,
  public sexe?: string,
  public roles?: any,
  public password?:string,
  public id_role?:any,

){


}
    
  
  }


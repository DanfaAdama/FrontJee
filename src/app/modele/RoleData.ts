
export interface IRole {
    id?:number;
    name?:string;
}


export class RoleData implements IRole {
    constructor(
        public id?: number,
        public name?: string){}
  
}

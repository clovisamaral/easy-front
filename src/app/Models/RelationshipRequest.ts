export class RelationshipRequest {
  id?:number;
  name:string='';
  providerName:string='';
  identifierCode:string='';
  billing:string='';
  contractValue:string='';
  extract:boolean=false;
  clientName:string='';
  active:boolean=false;
}

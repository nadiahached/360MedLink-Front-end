export class Salary {
  public id:number ;
  public iduser:number ;
  public titre:string ;
  public salary:string ;
  public date :string;

  constructor(id?: number, iduser?: number, titre?: string, salary?: string,date?:string) {
    this.id     = id=0;
    this.iduser = iduser=0;
    this.titre  = titre='';
    this.salary = salary='';
    this.date   = date='';
  }
}

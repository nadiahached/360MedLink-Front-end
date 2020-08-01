export class Conge{
  public  id :number;
  public  managerName: string;
  public  idUser:      number;
  public  manager_id:  number;
  public  debutTime:   string;
  public  breJours :   number;
  public  firstName:   string;
  public  secondeName: string;
  public  titre       :string;
  public  status      :string;
  public  rhApprouvment:string;

  constructor(id?:number,managerName?: string, idUser?: number, manager_id?: number, debutTime?: string, breJours?: number,
              firstName?: string, secondeName?: string, titre?: string) {
    this.managerName = managerName="";
    this.idUser = idUser=null;
    this.manager_id = manager_id=null;
    this.debutTime = debutTime="";
    this.breJours = breJours=0;
    this.firstName = firstName="";
    this.secondeName = secondeName="";
    this.titre = titre="";
  }
}

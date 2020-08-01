import {role} from './user';

export  class Employe {
  public email:string;
  public password:string;
  public contact:string;
  public firstName :string;
  public secondeName :string;
  public birthday  :string;
  public salaire :string;
  public managerName:string ;
  public manager_id :number;
  public cin :string;
  public rib :string;
  public adresse :string;
  public titre :string;
  public rejoint_time :string;
  public cota:number;
  public solde:number;

  constructor(email?: string, password?: string, contact?: string, firstName?: string, secondeName?: string, birthday?: string,
              salaire?: string, cin?: string, rib?: string, adresse?: string, titre?: string,rejoint_time?:string,cota?:number,
              solde?:number) {
    this.email = email='';
    this.password = password='';
    this.contact = contact='';
    this.firstName = firstName='';
    this.secondeName = secondeName='';
    this.birthday = birthday='';
    this.salaire = salaire='';
    this.cin = cin='';
    this.rib = rib='';
    this.adresse = adresse='';
    this.titre = titre='';
    this.cota=cota=0;
    this.rejoint_time=rejoint_time='';
    this.solde=solde=0;
  }
}

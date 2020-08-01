export class User {
   public id:number;
   public username:string;
   public publicPassword:string;
   public roles       :Array<role>;
   public firstName :string;
   public secondeName :string;
   public birthday  :string;
   public salaire :string;
   public cin :string;
   public managerName:string ;
   public manager_id :number;
   public rib :string;
   public adresse :string;
   public contact :string;
   public titre :string;
   public rejoint_time :string;
   public cota:number;
   public solde:number;


  constructor(id: number, username: string, publicPassword: string, roles: Array<role>,
              firstName: string, secondeName: string, birthday: string, salaire: string, managerName:string,manager_id:number,
              cin: string, rib: string, adresse: string, titre: string,contact:string,rejoint_time:string,cota:number,solde:number) {
    this.id = id;
    this.username = username;
    this.publicPassword = publicPassword;
    this.roles = roles;
    this.firstName = firstName;
    this.secondeName = secondeName;
    this.birthday = birthday;
    this.salaire = salaire;
    this.managerName = managerName;
    this.manager_id = manager_id;
    this.cin = cin;
    this.rib = rib;
    this.adresse = adresse;
    this.titre = titre;
    this.contact=contact;
    this.cota=cota;
    this.rejoint_time=rejoint_time;
    this.solde=solde;
  }
}
export class role {
  public id       :number;
  public roleName :string;

  constructor(id: number, roleName: string) {
    this.id = id;
    this.roleName = roleName;
  }
}

export class File {
  public idFile: number;
  public date: string;
  public data: string;

  constructor(idFile: number, date: string, data: string) {
    this.idFile = idFile;
    this.date = date;
    this.data = data;
  }
}

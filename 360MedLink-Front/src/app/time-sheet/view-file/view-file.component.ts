import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
type AOA = any[][];
import * as XLSX from 'xlsx';
import {FileService} from '../../providers/file.service';
import {AppToasterService} from '../../providers/toaster.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../providers/auth.service';
import {File} from '../../models/file';

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.scss']
})
export class ViewFileComponent implements OnInit,OnChanges {
  data: any;
  loading:boolean=false;
  headData: any;// excel row header
  @Input()fileId:string=null;
  FileData:any;

  constructor( private file :FileService,
               private router:Router,
               private auth:AuthService,
               private toaster: AppToasterService,
               private route:ActivatedRoute) {
  //  this.fileId = this.route.snapshot.paramMap.get('id');
    this.getFile();
  }

  ngOnInit(): void {
  }


  ngOnChanges(changes:SimpleChanges){
    if(changes.fileId!=undefined){
      if(changes.fileId.currentValue!=changes.fileId.previousValue){
        if(this.fileId!=null){
          this.fileId=changes.fileId.currentValue;
          console.log(this.fileId);
          this.getFile();
        };
      }
    }

  }

  getFile(){
    if((this.fileId!=null)&&(this.fileId!=undefined)){
      this.loading=true;
      this.file.getFile(this.fileId).subscribe(
        (file:File)=>{

          this.FileData=file.data;
          const bstr: string =  this.FileData;
          const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'base64'});

          /* grab first sheet */
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];

          /* save data */
          this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1, raw: false, range: 0}));
          console.log(this.data[1]);

          this.headData = this.data[0];
          this.data = this.data.slice(1); // remove first header record

          const ws2: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[1]];
          this.readDataSheet(ws2, 0);
        },
        (err)=>{
          this.loading=false;
        },
        ()=>{
          this.loading=false;
          this.toaster.lunchSuccessToast("fichier est récupérer","Success")

        })
    }
  }

  private readDataSheet(ws: XLSX.WorkSheet, startRow: number) {
    /* save data */
    let datas = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 0, raw: false, range: startRow}));
    let headDatas = datas[0];
    datas = datas.slice(1); // remove first header record

    for (let i = 0; i < this.data.length; i++) {
      this.data[i][this.headData.length] = datas.filter(x => x[12] == this.data[i][0])
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {FileService} from '../../providers/file.service';
import {AppToasterService} from '../../providers/toaster.service';
import {File} from '../../models/file';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {markAllAsDirty, requiredFileType, toResponseBody, uploadProgress} from '../../upload-file-validators';
import {NavigationEnd, Router} from '@angular/router';
declare var jQuery:any;

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
  files:File[];
  progress = 0;
  loading:boolean=false;
  hidden: boolean=false;
  selectedFile:number=null;
  uploadFile = new FormGroup({
    file: new FormControl(null, [Validators.required, requiredFileType('xls')]),
    date:new FormControl(''),

  });
  constructor(private file :FileService,
              private toaster: AppToasterService,
              private router:Router,
              private route:Router) {
    this.router.events.subscribe((res)=>{
      if(res instanceof NavigationEnd){
        if(res['url']!='/home/timeSheet'){
          this.hidden=true
        }else{
          this.onGetAllFiles();
          this.hidden=false;
        }
      }
    });
    this.onGetAllFiles()
  }

  ngOnInit(): void {
  }
  OnselectFile(id :number){
    this.selectedFile=id;
    return id;
  }
  submitUpload() {
    if ( !this.uploadFile.valid ) {
      markAllAsDirty(this.uploadFile);
      return;
    }
    let values:object=this.uploadFile.value;
    this.file.uploadFile(values).pipe(
      uploadProgress(progress => (this.progress = progress)),
      toResponseBody()
    ).subscribe(
      res => {},
      (err)=>{
        this.uploadFile.reset();
        this.loading=false;
      },
      ()=>{
        this.loading=false;
        this.toaster.lunchSuccessToast("Fichier importé avec succès","Succès");
        jQuery("#NewFile").modal("hide");
        this.uploadFile.reset();
        this.onGetAllFiles()

      });
  }
  onGetAllFiles(){
    this.loading=true;
    this.file.getAllFiles().subscribe(
      (res:File[])=>{
        this.files=res;
      },
      (err)=>{
        this.loading=false;
        this.toaster.lunchErrorToast("fichier non disponible","Erreur")
      },
      ()=>{
        this.loading=false;
        this.toaster.lunchSuccessToast("fichiers disponibles","Succès")
      }
    )
  }
  onDeleteFile(id:number){
    this.loading=true;
    this.file.DeleteFile(id).subscribe(
      ()=>{
      },
      (err)=>{
        this.loading=false;
        this.toaster.lunchErrorToast("impossible de supprimer ce fichier","Erreur");
      },
      ()=>{
        this.loading=false;
        this.toaster.lunchSuccessToast("fichiers disponibles","succès");
        this.onGetAllFiles();
      }
    )
  }
  uploadHasError( field: string, error: string ) {
    const control = this.uploadFile.get(field);
    return control.dirty && control.hasError(error);
  }
}

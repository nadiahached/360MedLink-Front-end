import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ViewFileComponent} from './view-file/view-file.component';
import {FileListComponent} from './file-list/file-list.component';

const routes: Routes = [


  {
    path: '', component: FileListComponent, children: [
      {path: 'view/file/:id', component: ViewFileComponent},

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes,)],
  exports: [RouterModule]
})
export class TimeSheetRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      extend:true
    })
  ],
  exports:[
    TranslateModule
  ]
})
export class SharedModule { }

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lang:any
  constructor(private translate: TranslateService) {
    if("language" in localStorage) {
      this.lang = localStorage.getItem('language')
      translate.use(this.lang);
    }else {
      translate.use(this.translate.defaultLang);
    }
   
  }
  title = 'angulartasks';
}

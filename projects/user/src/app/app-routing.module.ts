import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'tasks', 
  loadChildren: () => import(`./tasks-admin/tasks.module`).then(m => m.TasksAdminModule)
  },
  {path:'login', 
  loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes ,  { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'tasks', 
  loadChildren: () => import(`./tasks-admin/tasks-admin.module`).then(m => m.TasksAdminModule)
  },
  {path:'users', 
  loadChildren: () => import(`./manage-users/manage-users.module`).then(m => m.ManageUsersModule)
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    SharedModule,
    ManageUsersRoutingModule,
    HttpClientModule,
    CommonModule
  ]
})
export class ManageUsersModule { }

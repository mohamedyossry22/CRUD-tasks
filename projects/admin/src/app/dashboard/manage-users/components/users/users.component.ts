import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChangeStatus, UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'email' ,'tasksAssigned', 'actions'];
  dataSource:any = [];
  constructor(private service:UsersService, private toaster:ToastrService) { 
    this.getDataFromSubject()
  }
  page = 1;
  totalItems:any
  ngOnInit(): void {
    this.getUser()
  }


  getUser() {
    const Model = {
      page:this.page,
      limit:10,
      name:''
    }
    this.service.getUsersData(Model)
  }

  getDataFromSubject() {
    this.service.userData.subscribe((res:any) => {
      this.dataSource = res.data
      this.totalItems = res.total
    })
  }

  deleteUser(id:string , index:number) {
    if(this.dataSource[index].assignedTasks > 0) {
      this.toaster.error("You Can't Delete This User Until Finish His Tasks")
    }else {
      this.service.deleteUser(id).subscribe(res => {
        this.toaster.success("User Deleted Successfully")
        this.page = 1
        this.getUser()
      })
    }
   
  }
  changePage(event:any) {
    this.page = event
    this.getUser()
  }


  changeUserStatus(status:string , id:string , index:number) {
    const Model:ChangeStatus = {
      id,
      status
    }
    if(this.dataSource[index].assignedTasks > 0) {
      this.toaster.error("You Can't Update This User Until Finish His Tasks")
    }else {
      this.service.changeStatus(Model).subscribe(res => {
      this.toaster.success("User Status Updated Successfully")
      this.page = 1
      this.getUser()
    })
    }
   
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../../services/tasks.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import * as moment from 'moment';
import {TranslateService} from "@ngx-translate/core";
import { UsersService } from '../../../manage-users/services/users.service';

export interface PeriodicElement {
  title: string;
  user: string;
  deadline: string;
  status: string;
}

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadline','status', 'actions'];
  dataSource:any = [];
  tasksFilter!:FormGroup
  users:any = []

  status:any = [
    {name:this.translate.instant("tasks.Complete") },
    {name:"	In-Progress" },
  ]
  page:any = 1
  filteration:any = {
    page:this.page,
    limit:10
  }
  timeOutId:any
  total:any
  constructor(
    private service:TasksService , 
    public dialog: MatDialog , 
    private translate:TranslateService,
    private userService:UsersService
    ) { this.getDataFromSubject() }

  ngOnInit(): void {
    this.getUsers()
    this.getAllTasks()
  }


  getUsers() {
    this.userService.getUsersData()
  }

  getDataFromSubject() {
    this.userService.userData.subscribe((res:any) => {
      this.users = this.usersMapping(res.data)
    })
  }

  usersMapping(data:any[]) {
    let newArray = data?.map(item => {
      return {
        name:item.username,
        id:item._id
      }
    })
    return newArray
  }
  //new
  search(event:any) {
    this.filteration['keyword'] = event.value
    this.page = 1
    this.filteration['page'] = 1
    clearTimeout(this.timeOutId)
   this.timeOutId = setTimeout(() => {
      this.getAllTasks()
    }, 2000);
  }

  selectUser(event:any) {
    this.page = 1
    this.filteration['page'] = 1
    this.filteration['userId'] = event.value
    this.getAllTasks()
  }
  
  selectStatus(event:any) {
    this.page = 1
    this.filteration['page'] = 1
    this.filteration['status'] = event.value.trim()
    this.getAllTasks()
  }


  selectData(event:any , type:any) {
    this.page = 1
    this.filteration['page'] = 1
    this.filteration[type] = moment(event.value).format('DD-MM-YYYY') 
    console.log(this.filteration)
    if(type == 'toDate' && this.filteration['toDate'] !== 'Invalid date') {
      this.getAllTasks()
    }
  }
  getAllTasks() {
    this.service.getAllTasks(this.filteration).subscribe((res:any) => {
      this.dataSource = this.mappingTasks(res.tasks)
     this.total = res.totalItems
    } )
  }

  mappingTasks(data:any[]) {
    let newTasks = data.map(item => {
      return {
       ...item,
        user:item.userId.username
      }
    })
    console.log(newTasks)
    return newTasks
  }


  deleteTask(id:any) {
    this.service.deleteTask(id).subscribe(res =>{
      this.getAllTasks()
    })
  }

  updateTask(element:any) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      data:element,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.getAllTasks()
      }
    });
  }


  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.getAllTasks()
      }
    });
  }

  changePage(event:any) {
    this.page = event
    this.filteration['page'] = event
    this.getAllTasks()
  }
}

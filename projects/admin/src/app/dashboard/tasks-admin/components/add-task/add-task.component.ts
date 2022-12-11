import { Component, OnInit , Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../manage-users/services/users.service';
import { TasksService } from '../../services/tasks.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb:FormBuilder , 
    public dialog: MatDialogRef<AddTaskComponent> , 
    public matDialog:MatDialog,
    private service:TasksService,
    private toaster:ToastrService,
    private userService:UsersService
    ) { this.getDataFromSubject()}

  users:any = []
  fileName = ""
  newTaskForm!:FormGroup
  formValues:any
  ngOnInit(): void {
    console.log(this.data)
    this.createForm()
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
  createForm() {
    this.newTaskForm = this.fb.group({
      title : [this.data?.title || '' , [Validators.required , Validators.minLength(5)]],
      userId : [this.data?.userId?._id || '' , Validators.required],
      image : [this.data?.image || '' , Validators.required],
      description : [this.data?.description || '' , Validators.required],
      deadline: [ this.data ?  new Date(this.data?.deadline.split('-').reverse().join('-')).toISOString() : '' , Validators.required]
    })

    this.formValues = this.newTaskForm.value
  }


  selectImage(event:any) {
    this.fileName = event.target.value
    this.newTaskForm.get('image')?.setValue(event.target.files[0])
  }

  createTask() {
    let model =  this.prepereFormData()
    this.service.createTask(model).subscribe(res => {
      this.toaster.success("Task Created Succesfully" , "Success")
      this.dialog.close(true)
    },error => {
      this.toaster.error(error.error.message)
    })
  }

  updateTask() {
    let model =  this.prepereFormData()
    this.service.updateTask(model , this.data._id).subscribe(res => {
      this.toaster.success("Task Updated Succesfully" , "Success")
      this.dialog.close(true)
    },error => {
      this.toaster.error(error.error.message)
    })
  }

  prepereFormData() {
    let newData = moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY')
    let formData = new FormData()
    Object.entries(this.newTaskForm.value).forEach(([key , value] : any) => {
     
      if(key == 'deadline') {
        formData.append(key , newData)
      }else {
        formData.append(key , value)
      }
     
    })

    return formData
  }

  close() {
    let hasChanges = false
    Object.keys(this.formValues).forEach((item) => { 
      if(this.formValues[item] !== this.newTaskForm.value[item])   {
        hasChanges = true
      }
    })

    if(hasChanges) {
      const dialogRef = this.matDialog.open(ConfirmationComponent, {
        width: '750px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result == true) {
          
        }
      });
    }else {
      this.dialog.close()
    }
  }
}

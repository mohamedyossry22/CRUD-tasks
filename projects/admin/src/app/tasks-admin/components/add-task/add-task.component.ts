import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(private fb:FormBuilder , public dialog: MatDialogRef<AddTaskComponent> , public matDialog:MatDialog) { }

  taskForm!:FormGroup;
  users:any = [
    {name:"Moahmed" , id:1},
    {name:"Ali" , id:2},
    {name:"Ahmed" , id:3},
    {name:"Zain" , id:4},
  ]
  ngOnInit(): void {
    this.createform()
  }

  createform() {
    this.taskForm = this.fb.group({
      title:[''],
      userId:[''],
      deadline:[''],
      description:['']
    })
  }

  createNewTask() {
    this.dialog.close(true);
  }
  close() {
    this.dialog.close(false);
  }
}

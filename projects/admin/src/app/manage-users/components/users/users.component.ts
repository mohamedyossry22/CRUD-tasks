import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
export interface PeriodicElement {
  name: string;
  email: string;
  tasksAssigned: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', email: "1.0079", tasksAssigned:"10-11-2022" },
  { name: 'Helium', email: "4.0026", tasksAssigned:"10-11-2022" },
  { name: 'Lithium', email: "6.941", tasksAssigned:"10-11-2022" },
  { name: 'Beryllium', email: "9.0122", tasksAssigned:"10-11-2022" },
  { name: 'Boron', email: "10.811", tasksAssigned:"10-11-2022" },
  { name: 'Carbon', email: "12.010", tasksAssigned:"10-11-2022" },
  { name: 'Nitrogen', email: "14.006", tasksAssigned:"10-11-2022" },
  { name: 'Oxygen', email: "15.999", tasksAssigned:"10-11-2022" },
  { name: 'Fluorine', email: "18.998", tasksAssigned:"10-11-2022" },
  {  name: 'Neon', email: "20.179", tasksAssigned:"10-11-2022" },
];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'email' ,'tasksAssigned', 'actions'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }



}

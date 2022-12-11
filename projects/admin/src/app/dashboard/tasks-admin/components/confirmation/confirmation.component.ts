import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<ConfirmationComponent> , 
    public matDialog:MatDialog
  ) { }

  ngOnInit(): void {
  }

  confirm() {
    this.matDialog.closeAll()
  }

  close() {
    this.dialog.close()
  }
}

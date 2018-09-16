import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';

export interface TempUser{
  id: any,
  tempUserName: any
}
@Component({
  selector: 'app-username-dialog',
  templateUrl: './username-dialog.component.html',
  styleUrls: ['./username-dialog.component.scss']
})
export class UsernameDialogComponent implements OnInit {
  model: TempUser;
  action: string;
  newform: FormGroup;
  constructor(public dialogRef: MatDialogRef<UsernameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { 
      this.createForm();
  }
  validateMessages: TempUser = {
    id: [{type: '', message: ''}],
    tempUserName: [{type :'required', message: 'User Name is required'}]
  }
  ngOnInit() {
    this.model = this.data.model;
    console.log(this.model);
    if(this.model){
      this.rebuildForm();
    }
    this.action = "Add";
  }
  
  createForm() {
    this.newform = this.fb.group({
      id: [''],
      tempUserName: ['',Validators.required]
    });
  }

  rebuildForm() {
    const values: TempUser = {
      tempUserName: this.model.tempUserName,
      id: this.model.id
    }
    this.newform.reset(values);
  }
  onSubmit(){
    const values: TempUser = this.newform.value;
    this.model.id = values.id;
    this.model.tempUserName = values.tempUserName;
    this.dialogRef.close(this.data);
  }
  onCancel(): void{
    this.dialogRef.close();
  }
}

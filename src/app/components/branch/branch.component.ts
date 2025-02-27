import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BranchService } from 'src/app/services/branch/branch.service';

import { FormBuilder, Validators ,FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  branches: any[] = [];
  branchForm!: FormGroup;

  @ViewChild('addBranchDialog')
  addBranchDialog!: TemplateRef<any>;
  branch = {
    branch_name: '',
    number_of_employees: 0
  };
  

  constructor(private branchService: BranchService,private dialog: MatDialog, private fb: FormBuilder) {
    this.branchForm = this.fb.group({
      branch_name: ['', Validators.required],
      number_of_employees: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.branchService.getBranches().subscribe(data => {
      this.branches = data;
      console.log(data);
    });
  }

  openAddBranchDialog(): void {
    this.dialog.open(this.addBranchDialog);
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  submitBranchForm(): void {
    if (this.branchForm.valid) {
      this.branchService.createBranch(this.branchForm.value).subscribe(() => {
        this.loadBranches();
        this.closeDialog();
      });
    }
  }
}
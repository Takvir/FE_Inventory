import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/services/branch/branch.service';
import { Branch } from 'src/app/modal/branch.model';
import { FormBuilder, Validators ,FormGroup} from '@angular/forms';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  branches: any[] = [];
  newBranch: any = { name: '', location: '', numberOfEmployees: 0 };
  editingBranch: any = null;

  constructor(private branchService: BranchService) {}

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.branchService.getBranches().subscribe(data => {
      this.branches = data;
    });
  }

  createBranch(): void {
    this.branchService.createBranch(this.newBranch).subscribe(() => {
      this.loadBranches();
      this.newBranch = { name: '', location: '', numberOfEmployees: 0 };
    });
  }

  editBranch(branch: any): void {
    this.editingBranch = { ...branch };
  }

  updateBranch(): void {
    if (this.editingBranch) {
      this.branchService.updateBranch(this.editingBranch._id, this.editingBranch).subscribe(() => {
        this.loadBranches();
        this.editingBranch = null;
      });
    }
  }

  deleteBranch(id: string): void {
    this.branchService.deleteBranch(id).subscribe(() => {
      this.loadBranches();
    });
  }

  cancelEdit(): void {
    this.editingBranch = null;
  }
}
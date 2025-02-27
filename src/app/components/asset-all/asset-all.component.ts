import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/services/section/section.service';
import { BranchService } from 'src/app/services/branch/branch.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Asset {
  id: number;
  branch_id: number;
  branch_name: string;
  group_id: number;
  desktop_name: string;
  configuration: string;
  tag_name: string;
  warranty: string;
  price: number;
  purchase_date: string;
  status: string;
  asset_get_by: string;
  serial_number: string;
}

@Component({
  selector: 'app-asset-all',
  templateUrl: './asset-all.component.html',
  styleUrls: ['./asset-all.component.css']
})
export class AssetAllComponent implements OnInit {
  assets: Asset[] = [];
  assetForm!: FormGroup;
  isEdit: boolean = false;
  editAssetId: number | null = null;

  constructor(private assetService: SectionService, private branchService: BranchService, private fb: FormBuilder) {
    this.assetForm = this.fb.group({
      branch_id: ['', Validators.required],
      branch_name: ['', Validators.required],
      group_id: ['', Validators.required],
      desktop_name: ['', Validators.required],
      configuration: ['', Validators.required],
      tag_name: ['', Validators.required],
      warranty: ['', Validators.required],
      price: ['', Validators.required],
      purchase_date: ['', Validators.required],
      status: ['', Validators.required],
      asset_get_by: ['', Validators.required],
      serial_number: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAssets();
    
    
  }

  loadAssets(): void {
    this.assetService.getAssets().subscribe(assets => this.assets = assets);
 
  }




}

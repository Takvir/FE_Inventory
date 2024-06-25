import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/services/section/section.service';
import { BranchService } from 'src/app/services/branch/branch.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
  sections: any[] = [];
  branches: any[] = [];
  newAsset: any = { sectionId: '', assetName: '', cost: 0, quantity: 0, branch: '' };
  assetNames: string[] = ['CPU+Monitor','CPU','Monitor','Laptop','Server','UPS','Online UPS','Document Scanner','Router','Switch','IP Phone','POS Printer','Projector','SMART TV'];

  

  constructor(private sectionService: SectionService, private branchService: BranchService) {}

  ngOnInit(): void {
    this.loadSections();
    this.loadBranches();
  }

  loadSections(): void {
    this.sectionService.getSections().subscribe(data => {
      this.sections = data;
    });
  }

  loadBranches(): void {
    this.branchService.getBranches().subscribe(data => {
      this.branches = data;
    });
  }

  addAsset(): void {
    const { sectionId, ...asset } = this.newAsset;
    this.sectionService.addAssetToSection(sectionId, asset).subscribe(() => {
      this.newAsset = { sectionId: '', assetName: '', cost: 0, quantity: 0, branch: '' };
    });
  }
}

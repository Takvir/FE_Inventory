import { Component, OnInit } from '@angular/core';
import { SectionService } from '../../services/section/section.service';

interface BranchAssets {
  name: string;
  cpuMonitor: number;
  cpu: number;
  monitor: number;
  laptop: number;
  server: number;
  ups: number;
  onlineUps: number;
  documentScanner: number;
  router: number;
  switch: number;
  ipPhone: number;
  posPrinter: number;
  projector: number;
  smartTv: number;
}

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  sections: any[] = [];
  branchAssets: BranchAssets[] = [];
  newSection: any = { name: '' };
  editingSection: any = null;

  constructor(private sectionService: SectionService) {}

  ngOnInit(): void {
    this.loadSections();
  }

  loadSections(): void {
    this.sectionService.getSections().subscribe(data => {
      this.sections = data;
      this.transformData();
    });
  }

  transformData(): void {
    const branchMap: { [key: string]: BranchAssets } = {};

    this.sections.forEach(section => {
      section.assets.forEach((asset: { branch: { name: any; }; assetName: string; quantity: number; }) => {
        const branchName = asset.branch.name;
        if (!branchMap[branchName]) {
          branchMap[branchName] = { 
            name: branchName, 
            cpuMonitor: 0, 
            cpu: 0, 
            monitor: 0, 
            laptop: 0, 
            server: 0, 
            ups: 0, 
            onlineUps: 0, 
            documentScanner: 0, 
            router: 0, 
            switch: 0, 
            ipPhone: 0, 
            posPrinter: 0, 
            projector: 0, 
            smartTv: 0 
          };
        }
        if (asset.assetName === 'CPU+Monitor') {
          branchMap[branchName].cpuMonitor = asset.quantity;
        } else if (asset.assetName === 'CPU') {
          branchMap[branchName].cpu = asset.quantity;
        } else if (asset.assetName === 'Monitor') {
          branchMap[branchName].monitor = asset.quantity;
        } else if (asset.assetName === 'Laptop') {
          branchMap[branchName].laptop = asset.quantity;
        } else if (asset.assetName === 'Server') {
          branchMap[branchName].server = asset.quantity;
        } else if (asset.assetName === 'UPS') {
          branchMap[branchName].ups = asset.quantity;
        } else if (asset.assetName === 'Online UPS') {
          branchMap[branchName].onlineUps = asset.quantity;
        } else if (asset.assetName === 'Document Scanner') {
          branchMap[branchName].documentScanner = asset.quantity;
        } else if (asset.assetName === 'Router') {
          branchMap[branchName].router = asset.quantity;
        } else if (asset.assetName === 'Switch') {
          branchMap[branchName].switch = asset.quantity;
        } else if (asset.assetName === 'IP Phone') {
          branchMap[branchName].ipPhone = asset.quantity;
        } else if (asset.assetName === 'POS Printer') {
          branchMap[branchName].posPrinter = asset.quantity;
        } else if (asset.assetName === 'Projector') {
          branchMap[branchName].projector = asset.quantity;
        } else if (asset.assetName === 'SMART TV') {
          branchMap[branchName].smartTv = asset.quantity;
        }
      });
    });

    this.branchAssets = Object.values(branchMap);
  }

  createSection(): void {
    this.sectionService.createSection(this.newSection).subscribe(() => {
      this.loadSections();
      this.newSection = { name: '' };
    });
  }

  editSection(section: any): void {
    this.editingSection = { ...section };
  }

  updateSection(): void {
    if (this.editingSection) {
      this.sectionService.updateSection(this.editingSection._id, this.editingSection).subscribe(() => {
        this.loadSections();
        this.editingSection = null;
      });
    }
  }

  deleteSection(id: string): void {
    this.sectionService.deleteSection(id).subscribe(() => {
      this.loadSections();
    });
  }

  cancelEdit(): void {
    this.editingSection = null;
  }
}

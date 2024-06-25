import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { BranchComponent } from './components/branch/branch.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { SectionComponent } from './components/section/section.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'branch-list', component: BranchComponent  },
  { path: 'equipment', component: EquipmentComponent  },
  { path: 'sections', component: SectionComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

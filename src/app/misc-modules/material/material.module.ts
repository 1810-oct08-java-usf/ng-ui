import {NgModule} from '@angular/core';

import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatOptionModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule
} from '@angular/material';

const materials = [
  MatSidenavModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatTabsModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatOptionModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule
];

@NgModule({
  imports: [materials],
  exports: [materials]
})
export class MaterialModule { }

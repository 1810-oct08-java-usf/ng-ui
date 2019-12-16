import { NgModule } from "@angular/core";

import { MatDividerModule } from "@angular/material/divider";

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
  MatPaginatorModule,
  MatListModule,
  MatGridListModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule
} from "@angular/material";

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
  MatPaginatorModule,
  MatListModule,
  MatDividerModule,
  MatGridListModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule
];

@NgModule({
  imports: [materials],
  exports: [materials]
})
export class MaterialModule {}

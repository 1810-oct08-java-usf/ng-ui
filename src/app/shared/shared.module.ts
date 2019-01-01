import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatJumbotronModule } from '@angular-material-extensions/jumbotron';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { SliderModule } from 'angular-image-slider';
import { AppLogoComponent } from './app-logo/app-logo.component';

@NgModule({
  declarations: [NavbarComponent, AppLogoComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatJumbotronModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule,
    MatJumbotronModule,
    FlexLayoutModule,
    MatIconModule,
    MatTooltipModule,
    ScrollDispatchModule,
    MatTableModule,
    SliderModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatJumbotronModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    NavbarComponent,
    AppLogoComponent,
    ReactiveFormsModule,
    RouterModule,
    ScrollDispatchModule,
    MatTooltipModule,
    MatTableModule,
    SliderModule,
    MatSortModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }

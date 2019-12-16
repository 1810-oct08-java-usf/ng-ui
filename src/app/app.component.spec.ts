import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
    MatSidenavModule, MatIconModule, MatMenuModule, MatToolbarModule, MatListModule,
    MatExpansionModule, MatBadgeModule
} from '@angular/material';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SidenavComponent } from './components/HUD/sidenav/sidenav.component';
import { NavMenuComponent } from './components/HUD/nav-menu/nav-menu.component';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PipeModule } from '../pipes/pipe.module';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatSidenavModule, MatIconModule, MatMenuModule,
                MatToolbarModule, MatExpansionModule, BrowserAnimationsModule,
                RouterTestingModule, NoopAnimationsModule, MatListModule, MatBadgeModule,
                HttpClientTestingModule, PipeModule],
            declarations: [
                AppComponent, SidenavComponent, NavMenuComponent],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});

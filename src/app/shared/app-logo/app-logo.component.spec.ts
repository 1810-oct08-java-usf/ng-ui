import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { AppModule} from '../../app.module';
import { AppLogoComponent } from './app-logo.component';

/**
 * This test suite serves to check the proper creation of the AppLogo
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 */
describe('AppLogoComponent', () => {
  let component: AppLogoComponent;
  let fixture: ComponentFixture<AppLogoComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * the tested method should navigate to project, home
   * 
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  it('should navigate to project, home', () => {

    let navigateSpy = spyOn(router, 'navigate');

    component.homepageShortcut();

    expect(navigateSpy).toHaveBeenCalledWith(['projects', 'home']);
  });

});

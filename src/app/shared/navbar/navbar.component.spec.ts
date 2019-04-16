import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { AppModule} from '../../app.module';
import { NavbarComponent } from './navbar.component';

/**
 * This test suite serves to check the proper creation of the Navbar
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 */

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * the tested method should navigate to register
   * 
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  it('should navigate to register', () => {

    let navigateSpy = spyOn(router, 'navigate');

    component.goToRegister();

    expect(navigateSpy).toHaveBeenCalledWith(['auth', 'register']);
  })

  /**
   * the tested method should navigate to login
   * 
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  it('should navigate to login', () => {

    let navigateSpy = spyOn(router, 'navigate');

    component.goToLogin();

    expect(navigateSpy).toHaveBeenCalledWith(['auth', 'login']);
  })

  /**
   * the tested logout() method should navigate to login
   * 
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  it('should navigate to login', () => {

    let navigateSpy = spyOn(router, 'navigate');

    component.logout();

    expect(navigateSpy).toHaveBeenCalledWith(['auth/login']);
  })

  /**
   * the tested method should navigate to project, home
   * 
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  it('should navigate to project, home', () => {

    let navigateSpy = spyOn(router, 'navigate');

    component.homepageShortcut();

    expect(navigateSpy).toHaveBeenCalledWith(['projects', 'home']);
  })

});

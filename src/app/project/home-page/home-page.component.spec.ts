import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../../shared/shared.module';
import { AppModule} from '../../app.module';
import { HomePageComponent } from './home-page.component';

/**
 * This test suite serves to check the proper creation of the HomePage
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 */

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/core/services/user.service';
import { SharedModule } from '../../shared/shared.module';
import { AppModule} from '../../app.module';
import { ViewUsersComponent } from './view-users.component';
import { User } from 'src/app/core/models/User';
import { Observable, of } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

/**
 * This test suite serves to check the proper creation of the ViewProjects
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 * @author Ryan Williams | Michael Grammens | (1810-Oct22-Java-USF)
 */

fdescribe('ViewUsersComponent', () => {
  let component: ViewUsersComponent;
  let fixture: ComponentFixture<ViewUsersComponent>;
  let injector: TestBed;
  let service:UserService;
  let testUser:User;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule],
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(UserService);
    fixture = TestBed.createComponent(ViewUsersComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should view all users if logged-in as administrator', () => {
    testUser = {
      role:'ROLE_ADMIN'
    }
    let data;
    service.user = testUser;
    spyOn(service,'getUser').and.returnValue(
      of(data));
    component.ngOnInit()

    expect(component.retrievingProjects).toBeTruthy();
   
  });

  it('should test applyUserFilter', () => {
   
    let filterValue = "test";
     component.applyUserFilter(filterValue);
     expect(component.applyUserFilter).toEqual(filterValue);
     expect(component.applyUserFilter).toBeTruthy();
   });

  it('test updateToAdmin ',() =>{
    let user={
      name:'test'
    }
    component.updateToAdmin(user); 
    expect(component.applyUserFilter).toEqual(user);
    expect(component.applyUserFilter).toBeTruthy();
    expect(component.applyUserFilter).toThrow('error');
  });





});

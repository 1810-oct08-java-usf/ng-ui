import { UserService } from 'src/app/core/services/user.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AppModule} from '../../app.module';
import { ZipComponent } from './zip.component';
import { ZipFileExplorerModule } from '../zip-file-explorer.module';
import { ProjectService } from 'src/app/core/services/project.service';

describe('ZipComponent', () => {
  let component: ZipComponent;
  let fixture: ComponentFixture<ZipComponent>;
  let router: Router;
  let projectService:ProjectService;
  let renderFile: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [BrowserAnimationsModule, RouterTestingModule, AppModule, ZipFileExplorerModule],
      providers:[ProjectService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipComponent);
    component = fixture.componentInstance;
    projectService = TestBed.get(ProjectService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  /**
   * This test should display error messages
   * @Author Gabriel Zapata and Edward Bechtold (190107-Java-Spark-USF)
   */
  xit('should throw an error', () => {
    
    fixture.detectChanges();
    let message = 'test';
    
    component.errorFile(message);
    
    expect(message).toBeTruthy();
  })

  /**
   * This tests the safeTitle method to ensure links are being properly created
   */
  xit('should return a substring of link', () => {
    
    fixture.detectChanges();
    let link = 'test';
    
    component.safeTitle(link);

    expect(component.safeTitle).toBe('test/');
  });

  /**
   * testing that when the zip component is rendered, if the user is null
   * then the user should be navigated back to login
   * 
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  xit('should navigate to login if the user is null', () => {

    fixture.detectChanges();
    router = TestBed.get(Router);
    localStorage.clear();
    localStorage.setItem('user', null);
    let navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
  });
  
  /**
   * Test will verify goBack location
   */
  xit('should test goBack and location.back to be called',() =>{
    
    fixture.detectChanges();
    component.goBack();
  })
  /**
   * Test test error file
   * not working  
   */
  xit('should test errorFile ',()=>{
    
    fixture.detectChanges();
    let message = 'test'
    component.errorFile(message);
    
  })
  /**
   * Test test error file 
   * not working
   */
  xit('should test safeFile ',()=>{
    
    fixture.detectChanges();
    let message = 'test'
    component.safeTitle(message);
  })
   /**
   * Test test openRenderFile 
   * not working
   */
  xit('should test openRenderFile ',()=>{
    
    fixture.detectChanges();
    renderFile = 'test';
    component.OpenFile.push(renderFile);
    component.safeTitle(renderFile);
    expect(component.SelectedFile).toBe(renderFile);
  })
    /**
   * Test test openRenderFile 
   * not working
   */
  xit('should test openRenderFile ',()=>{
    
    fixture.detectChanges();
    renderFile = 'test';
    component.OpenFile.push(renderFile);
    component.safeTitle(renderFile);
    expect(component.SelectedFile).toBe(renderFile);
  })
     /**
   * Test test openRenderFile 
   * not working
   */
  xit('should test getFileNameFromHpResponse',()=>{
    
    fixture.detectChanges();
    let message = 'test'
    component.getFileNameFromHttpResponse(message);
  })


});

import { UserService } from 'src/app/core/services/user.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AppModule} from '../../app.module';
import { ZipComponent } from './zip.component';
import { ZipFileExplorerModule } from '../zip-file-explorer.module';
import { ProjectService } from 'src/app/core/services/project.service';
import { Observable } from 'rxjs';

fdescribe('ZipComponent', () => {
  let component: ZipComponent;
  let fixture: ComponentFixture<ZipComponent>;
  let router: Router;
  let projectService:ProjectService;
  let renderFile: any;
  class RenderFile {
    fileName: String;
    fileContent: String;
  }

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
   * @author Gabriel Zapata | Edward Bechtold (190107-Java-Spark-USF)
   */
  it('should call ErrorFile an error', () => {
    
    fixture.detectChanges();
    let message = 'test';
    
    component.errorFile(message);
    
    expect(message).toBeTruthy();
  })

  /**
   * This tests the safeTitle method to ensure links are being properly created
   * 
   * @author Gabriel Zapata | Edward Bechtold (190107-Java-Spark-USF)
   */
  it('should return a substring of link', () => {
    
    fixture.detectChanges();
    let link = 'test';
    
    component.safeTitle(link);

    expect(link).toBe('test');
  });

  /**
   * Test will verify ngOnInit field SelectedFile to be truthy
   * 
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */

  it('should verify to fields if the user is NOT null', () => {
    
    let testFile : RenderFile
    testFile ={
      fileName: 'testFileName',
      fileContent: 'testFileContent'
    }


    spyOn(component,'defaultFile').and.returnValue(testFile);
    component.ngOnInit();

    expect(component.SelectedFile).toBeTruthy();
  });


   /**
   * Test test openRenderFile 
   * 
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   * 
   */
  it('should test openRenderFile and verify that testFile is being added to OpenFile ',()=>{
    let testFile : RenderFile
    testFile ={
      fileName: 'testFileName',
      fileContent: 'testFileContent'
    }
    component.OpenFile = [];

    component.openRenderFile(testFile);

    expect(component.SelectedFile).toBe(testFile);
    expect(component.OpenFile).toContain(testFile);

  })

   /**
   * Test test closeRenderFile 
   * 
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   * 
   */

  it('should test closeRenderFile if OpenFile array removes testFile but still contain testFile2  ',()=>{
    let testFile : RenderFile
    testFile ={
      fileName: 'testFileName',
      fileContent: 'testFileContent'
    }
    let testFile2 : RenderFile
    testFile ={
      fileName: 'testFileName',
      fileContent: 'testFileContent'
    }

    component.OpenFile = [testFile,testFile2];
    spyOn(component,'defaultFile').and.returnValue(testFile2);

    component.closeRenderFile(testFile);

    expect(component.OpenFile).toContain(testFile2);
    expect(component.SelectedFile).toBe(testFile2);

  })

   /**
   * Test getFileNameFromHttpResponse is called  
   * 
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   * 
   */

  it('should test getFileNameFromHttpResponse with testContentDispositionHeader',()=>{
    let testContentDispositionHeader = ['test=1; test=2; test=3;'].toString();
    component.getFileNameFromHttpResponse(testContentDispositionHeader);


  })
  /**
   * Test openData
   * 
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */

  it('should verify RenderFile, Select, OpenFile, with data.name is truthy should be truthy',() =>{
    let data={
      name: 'testName'
    }
    let datafilename;

    component.openData(data,datafilename);

    expect(component.OpenFile).toBeTruthy();
   

  })

   /**
   * Test openData
   * 
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */

  it('should verify RenderFile, Select, OpenFile, with data.name is falsy OpenFile should be truthy',() =>{
    let data={
      name: ''
    }
    let datafilename = 'test'


    component.openData(data,datafilename);

    expect(component.OpenFile).toBeTruthy();
  })

   
});

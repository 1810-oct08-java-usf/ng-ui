import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { AppModule} from '../../app.module';
import { ZipComponent } from './zip.component';
import { ZipFileExplorerModule } from '../zip-file-explorer.module';

xdescribe('ZipComponent', () => {
  let component: ZipComponent;
  let fixture: ComponentFixture<ZipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [BrowserAnimationsModule, RouterTestingModule, AppModule, ZipFileExplorerModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

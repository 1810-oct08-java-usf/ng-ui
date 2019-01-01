import { TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { AppModule} from '../../app.module';

import { ProjectService } from './project.service';

describe('ProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [ ],
    imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule]}));

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });
});

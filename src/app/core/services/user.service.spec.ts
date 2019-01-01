import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationModule } from 'src/app/authentication/authentication.module';
import { AppModule} from '../../app.module';
import { UserService } from './user.service';

/**
 * This test serves to check if this service was properly created
 * as well as the functionality of the various methods within
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 */
describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [ ],
    imports: [ RouterTestingModule, BrowserAnimationsModule, AppModule, AuthenticationModule]}));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});

import { LexPipe } from './lex.pipe';
import { DomSanitizer } from '@angular/platform-browser';

fdescribe('LexPipe', () => {
 let sanitizer: DomSanitizer;

  it('create an instance', () => {
    const pipe = new LexPipe(sanitizer);
    expect(pipe).toBeTruthy();
  });
});

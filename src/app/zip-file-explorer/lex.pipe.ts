import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'lex'
})
/**
 * Class Lex
 * A pipe to highlight input code into highlighted html
 * @author Andrew Mitchem (1810-Oct08-Java-USF)
 */
export class LexPipe implements PipeTransform {
  public lex: Object = new Object();
  /**
   * Lex constructor
   * construct the lex();
   * @param DomSanitizer: used to notify angular that text is safe for innherhtml assignment
   * @author Andrew Mitchem (1810-Oct08-Java-USF)
   */
  constructor(private sanitizer: DomSanitizer) {
    this.makeLex();
  }
  /**
   * Lex.tranform(input)
   * the function called by the lexpipe
   * checks the lex for a binded property and parses the string based on that to assign tokens
   *
   * returns explicity sanitized bypassed strings for innerhtml.
   * @author Andrew Mitchem (1810-Oct08-Java-USF)
   */
  transform(value: string, args?: any): any {
   for (const lexDict in this.lex) {
    if (this.lex.hasOwnProperty(lexDict)) {
      value = this.parse(lexDict, value);
    }
   }
   return this.sanitizer.bypassSecurityTrustHtml(value);
  }
  /**
   * Lex.parse(string,string)
   * simply calls replaced using the lext.  more contextual highlightning should parse the string
   * in stream till a valid token match
   *
   * @param dict: property reference of the lex object containing the regex for this replace
   * @param template: string to be parsed.
   * @author Andrew Mitchem (1810-Oct08-Java-USF)
   */
  parse(dict: string, template: string): string {
    return template.replace(this.lex[dict], dict);
  }
  /**
   * Lex.makeLex()
   * Initializes the lex();
   * property binds the object to have a string("token") and regex
   *
   * \$& inside the token is the matched regex
   *
   * &lt &gt are escaped characters to render <> in html as they are reserve characters normal
   *
   * These must happen first
   *
   * the regex g field is to specify to parse all instances that match.
   *
   * @author Andrew Mitchem (1810-Oct08-Java-USF)
   */
  makeLex() {
    /**
     * this "lex"-esqe is used to parse text and assign it a span "token"
     * sanizitation is a major concern in this code
     * high quality contextual highlighting can only be done with a full lex-bison esque parse
     * with the lex side sorting into tokens for the bison side to recombine into
     * a complete template tree with tokens snippets ( <span [innertext]=tokenvalue [class]=tokentype> )
     * only creating a token after matching or exhausting the lex matches
     *
     * the first noticable issue is >token < occurences. attempting to ignore them with
     * look ahead and lookbehind has had mixed results
     * moving to bison-esqu parser would relive this issue as we do not assign tokens additonal text which will
     * be matched later.
     *
     * *This currently does multiple passes matching one individual expression instead of poping
     * input and evaulating with lookahead/behind against the entire lex then and poping onto a stack
     * This causes a large majority of our concurrent editing issues though we also have to be mindful
     * of stream input at that point and consuming based on a token needs. this creates an issue where
     * tokens could match to previous created span elements. the lex-bison approach would solve this.
     *
     * uses css child selector to enforce certian element colors (ie for comments and strings)
     * by overwriting child elements (*) properites
     *
     * DO NOT REORDER THESE WITHOUT EXTENSIVE TESTING.
     */
    let isLookBehindSupported = false;
    try {
      isLookBehindSupported = !!new RegExp('(?<=)');
    } catch (e) {
    }

    if (isLookBehindSupported) {
      this.lex['&lt']                               = /</g;
      // mild sanitization
      this.lex['&gt']                               = />/g;
      // ^--
      this.lex[`<span class='token1'>\$&</span>`]   = /[=;{})(,:+-]|\!|\||\[|\]/gi;
      // this must be the first token generator as = is inside the spans produce currently:
      // matches based symbol tokens( + = ; { } )
      this.lex[`<span class='token13'>\$&</span>`]  = /\/\/.*/g;
      // this property matches comments (//) no support for /* */ ones
      this.lex[`<span class='token15'>\$&</span>`]  = /(import[^s]|package).*/g;
      // Simply selects imports/packages. doesn't include items infront of them (i.e. Angular)
      this.lex[`<span class='token16'>\$&</span>`]  = /(?<=(class ))\w+/g;
      // simply selects words preceed by reserved token class uses lookahead
      this.lex[`<span class='token9'>\$&</span>`]   = /(?<=(public ))\w+/g;
      // simply selects tokens preceeded by reserved token public uses lookahead
      this.lex[`<span class='token10'>\$&</span>`]  = /(?<=(private ))\w+/g;
      // simply selects tokens preceeded by reserved token private.uses lookahead
      this.lex[`<span class='token11'>\$&</span>`]  = /(?<=(static ))\w+/g;
      // simply selects tokens preceeded by reserved token static uses lookahead
      this.lex[`<span class='token12'>\$&</span>`]  = /(?<=(protected ))\w+/g;
      // simply selects tokens preceeded by reserved token protected uses lookahead
      this.lex[`<span class='token2'>\$&</span>`]   = /public|private|protected|package/g;
      // simply selects reserved tokens public private protected package
      this.lex[`<span class='token3'>\$&</span>`]   = /(?<!\w)(Integer|boolean|Boolean|int|String|number)(?!\w)/g;
      this.lex[`<span class='token17'>\$&</span>`]  = /(?<!\w)(string|Observable|any|Date|let|long|Long|byte|Byte|char|Char)(?!\w)/g;
      // simply selects reserved tokens for base types and wrapper classes  uses negative lookahead and negative lookbehind
      this.lex[`<span class='token4'>\$&</span>`]   = /(^(\s|\d){4})|((?<=\n<\/span>)(\s|\d){4})|(\n(\s|\d){4})/g;
      // simply selects the line numbers. checks for line numbers at start of text.
      // line numbers where a span clips the carriage return, and raw line numbers after carriage returns
      this.lex[`<span class='token5'>\$&</span>`]   = /@[\w\d]+/g;
      // simply selects @annotations and decorators
      this.lex[`<span class='token6'>\$&</span>`]   = /(?<!\w)(if|for|new|return|void|extends|exports|imports|providers|constructor|declarations|implements|console|System|else|try|catch)(?!\w)/g;
      // simply selects tokens that are reserved for flow control uses negative lookahead and lookbehind
      this.lex[`<span class='token7'>\$&</span>`]   = /(?<!\w)(this|super|switch|null|case|selector|templateUrl|styleUrls|default|const|throws|export)(?!\w)/g;
      // simply selects tokens that are reserved keywords (this|super|switch|null)
      this.lex[`<span class='token8'>\$&</span>`]   = /\.\w+/g;
      // simply selects tokens that are .operators. ie this.method()
      this.lex[`<span class='token14'>\$&</span>`]  = /"(?:[^"\\]|\\.)*"/g;
      // simply selects tokens that are strings. exludes escaped "" ie "string" "string are made by \" \" "
      // uses non capturing group with negative single character group to include \" in the result
      // this particular regex expression is from stackoverflow.
    } else {
      this.lex['&lt']                               = /</g;
      // mild sanitization
      this.lex['&gt']                               = />/g;
      this.lex[`<span class='token5'>\$&</span>`]   = /@[\w\d]+/g;
    }
  }
}

  /**
  * RenderFile
  * Class for storing render related structure
  * @author Andrew Mitchem (1810-Oct08-Java-USF)
  */
 export class RenderFile {
     name: String;
     content: String;
 
     constructor(name?: string, content?: string) {
       this.name = name;
       this.content = content;
     }
   }
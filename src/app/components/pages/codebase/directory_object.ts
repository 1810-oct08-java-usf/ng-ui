  /**
   * class for storing either a directory or a path string
   * @author Mike James (1906-Aug08)
   */
  export class DirectoryObject {
     name: string;
     contents: string | DirectoryObject[];
 
     constructor(name?: string,
                 contents?: string | DirectoryObject[]) {
       this.name = name;
       this.contents = contents;
     }
   }
export interface Project {
    id?: any;
    name?: string;
    batch?: string;
    trainer?: string;
    groupMembers?: string[];
    screenShots?: any[];
    zipLinks?: string[];
    techStack?: string;
    status?: string;
    description?: string;
    approvingProject?: boolean;
    projectApproved?: boolean;
    projectDeclined?: boolean;
    dataModel?: any[];
    oldProject?: Project;
    userId?: any; // Track userId (owner of the project)
   }

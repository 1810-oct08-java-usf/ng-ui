export interface Notification{
    notificationId?:number;
    dateCreated?:Date;
    read?:boolean;
    title?:string;
    fullDescription?:string;
    shortDescription?:string;
    userId?:number;
    contentType?:string;
    projectId?:string;
}
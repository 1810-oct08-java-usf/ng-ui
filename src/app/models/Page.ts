import { Notification } from 'src/app/models/Notification';

export interface Page{
    content: Notification[];
    pageable: any;
    totalPages: number;
    last: boolean;
    totalElements: number;
    size: number;
    number: number;
    sort: any;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}
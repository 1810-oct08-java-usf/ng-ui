import { Injectable } from '@angular/core';
import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectFilterService {

  constructor() { }

  filterProjectByName(projects: Project[], name: string): Project[] {
    return projects.filter(item => {
      return item.name.toLowerCase().includes(name);
    });
  }

  filterProjectByStatus(projects: Project[], status: string) {
    return projects.filter(item => {
      return item.status == status;
    });
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  private sidebarVisible = new BehaviorSubject<boolean>(true); 

  toggleSidebar() {
    this.sidebarVisible.next(!this.sidebarVisible.value);
  }

  isSidebarVisible() {
    return this.sidebarVisible.asObservable();
  }
}

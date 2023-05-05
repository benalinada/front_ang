import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Add New Cube',  icon: 'fiber_new', class: '' },
  { path: '/icons', title: 'Add Calculation ',  icon:'playlist_add', class: '' },
  { path: '/table-list', title: 'Dispatch an existing cube',  icon:'send', class: '' },
  { path: '/typography', title: 'Reporting',  icon:'equalizer', class: '' },
 { path: '/user-profile', title: 'Acount',  icon:'person', class: '' },
 // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}

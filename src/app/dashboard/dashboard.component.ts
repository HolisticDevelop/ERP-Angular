import { Component, OnInit } from '@angular/core';

const MENU_OPTIONS = [
  {
    label: "Home",
    route: "",
    icon: "home"
  },
  {
    label: "Inventario",
    route: "product",
    icon: "inventory"
  }
]

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menuOptions = MENU_OPTIONS;

  constructor() { }

  ngOnInit(): void {

  }

}

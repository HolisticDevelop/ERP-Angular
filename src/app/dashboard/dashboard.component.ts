import { Component, OnInit } from '@angular/core';

const MENU_OPTIONS = [
  {
    label: "Dashboard",
    route: "",
    icon: "dashboard"
  },
  {
    label: "Inventario",
    route: "product",
    icon: "inventory"
  },
  {
    label: "Usuarios",
    route: "register",
    icon: "personadd"
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

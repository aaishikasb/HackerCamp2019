import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logout() {
    window.location.href="http://localhost";
  }

  constructor() { }

  ngOnInit() {
  }

}

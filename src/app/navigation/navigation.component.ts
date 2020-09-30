import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  menuExpanded = true;
  navigationClass = `navigation-bar ${this.menuExpanded ? 'large' : 'small'}`;
  test = 'adf';
  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.menuExpanded = !this.menuExpanded;
    this.navigationClass = `navigation-bar ${
      this.menuExpanded ? 'large' : 'small'
    }`;
  }
}

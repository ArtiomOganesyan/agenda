import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'agenda';
  local = 1;
  tableOpened = false;

  get tableButtonClass() {
    return {
      'table-toggle': true,
      down: this.tableOpened,
      up: !this.tableOpened,
    };
  }

  get tableClassroom() {
    return {
      'table-classroom': true,
      opened: this.tableOpened,
    };
  }
  test() {
    this.local++;
  }

  toggleTable() {
    this.tableOpened = !this.tableOpened;
  }
}

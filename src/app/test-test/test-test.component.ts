import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-test',
  templateUrl: './test-test.component.html',
  styleUrls: ['./test-test.component.scss'],
})
export class TestTestComponent implements OnInit {
  toggleClass = true;
  get classAtt() {
    return {
      green: this.toggleClass,
      yellow: !this.toggleClass,
      'text-center': true,
    };
  }

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.toggleClass = !this.toggleClass;
    }, 20000);
  }
}

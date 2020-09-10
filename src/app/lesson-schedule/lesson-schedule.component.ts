import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lesson-schedule',
  templateUrl: './lesson-schedule.component.html',
  styleUrls: ['./lesson-schedule.component.scss'],
})
export class LessonScheduleComponent implements OnInit {
  form: FormGroup;

  lessons: Array<any> = [];

  infoVisibility = false;
  formVisibility = false;
  constructor() {}

  ngOnInit(): void {
    this.lessons =
      JSON.parse(localStorage.getItem('DB_Lessons')).map((lesson) => ({
        ...lesson,
        visibility: false,
      })) || [];
    this.form = new FormGroup({
      date: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      homework: new FormControl('', Validators.required),
      additionalInfo: new FormControl('', Validators.required),
    });
  }

  formToggle() {
    this.formVisibility = !this.formVisibility;
  }

  infoToggle(id: string) {
    this.lessons.forEach((lesson) => {
      if (lesson.id === id) lesson.visibility = !lesson.visibility;
      return lesson;
    });
  }

  remove(id: string) {
    if (confirm('Уверены, что хотите удалить урок?'))
      this.lessons = this.lessons.filter((lesson) => lesson.id !== id);
    localStorage.setItem('DB_Lessons', JSON.stringify(this.lessons));
  }

  submit() {
    const { date, title, homework, additionalInfo } = this.form.value;
    this.lessons.push({
      ...this.form.value,
      id: Math.random().toString(16).slice(2),
      visibility: false,
    });
    localStorage.setItem('DB_Lessons', JSON.stringify(this.lessons));
    console.log(this.lessons);
    this.formToggle();
    this.form.reset();
  }
}

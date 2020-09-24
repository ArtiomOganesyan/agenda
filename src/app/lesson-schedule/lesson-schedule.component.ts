import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DBService } from '../services/db.service';
import { ILesson } from '../services/Agenda.interface';
import { DBClassroomService } from '../services/dbClassroom.service';

@Component({
  selector: 'app-lesson-schedule',
  templateUrl: './lesson-schedule.component.html',
  styleUrls: ['./lesson-schedule.component.scss'],
})
export class LessonScheduleComponent implements OnInit {
  form: FormGroup;
  propLesson: any[];
  formVisibility = false;
  titleLength = 0;

  @Output() newLessonSubmitted = new EventEmitter();

  public get lessons(): Array<ILesson> {
    return this.DB.lessons;
  }

  constructor(private DB: DBService, private DB_Students: DBClassroomService) {
    this.getLessons();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl('', Validators.required),
      title: new FormControl('', [Validators.required]),
      homework: new FormControl('', Validators.required),
      additionalInfo: new FormControl('', Validators.required),
    });
  }

  formToggle() {
    this.formVisibility = !this.formVisibility;
  }

  infoToggle(id: string) {
    this.propLesson.forEach((lesson) => {
      if (lesson.id === id) lesson.visibility = !lesson.visibility;
      return lesson;
    });
  }

  getLessons() {
    this.propLesson = this.lessons.map((lesson) => ({
      ...lesson,
      visibility: false,
    }));
  }

  remove(id: string) {
    this.DB.remove(id);
    this.getLessons();
  }

  submit() {
    this.DB.push(this.form.value);
    this.formToggle();
    this.form.reset();
    this.getLessons();
    this.DB_Students.syncLessonsAndStudents();
    this.newLessonSubmitted.emit();
  }

  test() {
    // console.log(this.form);
    // console.log(this.titleLength);
    // this.DB_Students.syncLessonsAndStudents();
    // this.newLessonSubmitted.emit();
  }

  edit(key: string, id: string, index: string | number) {
    console.log('edit');
  }

  checkMaxLength(element) {
    this.titleLength = 0;
    if (element.value.length) this.titleLength = element.value.length;
  }
}

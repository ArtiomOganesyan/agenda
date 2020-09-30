import {
  Component,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DBService } from '../services/db.service';
import { ILesson } from '../services/Agenda.interface';
import { DBClassroomService } from '../services/dbClassroom.service';
import { TestPipePipe } from '../test-pipe.pipe';
import { DatePipe, formatCurrency, getCurrencySymbol } from '@angular/common';
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
  formData;
  text = 'test';
  date = new Date();

  @Output() newLessonSubmitted = new EventEmitter();

  public get lessons(): Array<ILesson> {
    return this.DB.lessons;
  }

  constructor(
    private DB: DBService,
    private DB_Students: DBClassroomService,
    @Inject(LOCALE_ID) private locale: string,
    private datePipe: DatePipe,
    private testPipe: TestPipePipe
  ) {
    this.getLessons();
    const datePipeString = datePipe.transform(Date.now(), 'yyyy-MM-dd');
    console.log(datePipeString);
    const textPipe = testPipe.transform(this.text);
    console.log(textPipe);

    const currencyPipeString = formatCurrency(
      200,
      this.locale,
      getCurrencySymbol('USD', 'wide')
    );

    console.log(currencyPipeString);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl('', Validators.required),
      title: new FormControl('', [Validators.required]),
      homework: new FormControl('', Validators.required),
      additionalInfo: new FormControl(''),
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
    this.formData = this.form.value;
    this.form.reset();
    this.getLessons();
    this.DB_Students.syncLessonsAndStudents();
    console.log(this.form);
    this.newLessonSubmitted.emit();
    this.form.value;
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

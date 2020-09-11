import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

// interface Student = {
//   name: string,
//   picked: boolean,
//   lessons: Array,

// }

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss'],
})
export class ClassroomComponent implements OnInit {
  form;
  formGrade;
  student;
  students: Array<any>;
  studentList;
  studentFormVisibility;

  ave;

  constructor() {
    console.log('con');
    this.students = this.loadStudents() || [];
  }

  ngOnInit(): void {
    console.log('init');

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });
    this.formGrade = new FormGroup({
      grade: new FormControl('', Validators.required),
    });
    this.students = this.loadStudents() || [];
  }

  pickStudentFormToggle() {
    this.studentList = !this.studentList;
  }

  toggleStudentForm() {
    this.studentFormVisibility = !this.studentFormVisibility;
  }

  pickStudent(id) {
    this.studentList = !this.studentList;
    console.log(this.students);
    this.student = this.students.filter((student) => student.id === id)[0];
    this.student = { ...this.student, picked: true };
  }

  deleteStudent() {
    console.log('student deleted');
  }

  submit() {
    console.log('form submit', this.form);
    this.students.push({
      ...this.form.value,
      picked: false,
      id: Math.random().toString(16).slice(2),
      averageGrade: '',
      averageGradeSecond: '',
      lessons: JSON.parse(localStorage.getItem('DB_Lessons')).map((el) => ({
        title: el.title,
        grade: '',
        id: el.id,
      })),
    });
    const newStudents = [...this.students];
    this.saveStudents();
    this.form.reset();
  }

  addGrade(id) {
    const lessonGraded = this.student.lessons.filter(
      (lesson) => lesson.id === id
    )[0];
    lessonGraded.grade = this.formGrade.value.grade;
    this.students = this.students.map((student, index, array) => {
      if (student.id === this.student.id) {
        this.student.averageGrade =
          Math.round(
            this.student.lessons.reduce((acc, lesson) => {
              console.log(acc, lesson);
              return acc + lesson.grade;
            }, 0) / this.student.lessons.length
          ) + '';

        this.student.averageGradeSecond = this.student.averageGradeSecond =
          Math.round(
            (this.student.lessons.reduce((acc, lesson) => {
              return acc + lesson.grade;
            }, 0) /
              this.student.lessons.length +
              Number.EPSILON) *
              100
          ) /
            100 +
          '';
        return this.student;
      }
      return student;
    });
    console.log(this.students);
    this.saveStudents();
  }

  saveStudents() {
    console.log('save');
    localStorage.setItem('DB_Students', JSON.stringify(this.students));
  }

  loadStudents() {
    console.log('load', this.students);

    return JSON.parse(localStorage.getItem('DB_Students'));
  }
}

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IStudent } from '../services/Agenda.interface';
import { DBClassroomService } from '../services/dbClassroom.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss'],
})
export class ClassroomComponent implements OnInit, OnChanges {
  form: FormGroup;
  formGrade: FormGroup;
  student: IStudent;
  students: Array<IStudent>;
  studentList: boolean;
  studentFormVisibility: boolean;
  studentInView: string;

  @Input() someEvent: any;

  constructor(private DB: DBClassroomService) {}

  ngOnInit(): void {
    this.loadStudents();

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });
    this.formGrade = new FormGroup({
      grade: new FormControl('', Validators.required),
    });
  }

  ngOnChanges(someEvent: any) {
    if (this.student) this.studentInView = this.student.id;
    this.student = undefined;
    this.loadStudents();
  }

  loadStudents(): void {

    this.students = this.DB.students.map((student) => ({
      ...student,
      picked: false,
    }));

    if (this.studentInView) this.pickStudent(this.studentInView);
  }

  saveStudent(newStudent) {
    this.DB.setStudent(newStudent);
  }

  pickStudentFormToggle() {
    this.studentList = !this.studentList;
  }

  toggleStudent(id: string) {
    this.studentList = !this.studentList;
    this.pickStudent(id);
  }

  pickStudent(id: string) {
    this.student = this.students.filter((student) => student.id === id)[0];
    this.student = { ...this.student, picked: true };
  }

  deleteStudent() {
    console.log('student deleted');
  }

  submit() {
    this.saveStudent(this.form.value);
    this.loadStudents();
    this.form.reset();
  }

  addGrade(id: string) {
    this.student = this.DB.addGrade(
      this.student,
      id,
      this.formGrade.value.grade
    );
    this.loadStudents();
    this.formGrade.reset();
  }
}

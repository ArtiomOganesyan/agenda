import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DBClassroomService } from 'src/app/services/dbClassroom.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnChanges, OnDestroy {
  form: FormGroup;
  formGrade: FormGroup;
  check: string;
  students;

  @Output() studentEvent = new EventEmitter<any>();

  constructor(private DB: DBClassroomService) {}

  ngOnInit(): void {
    this.loadStudents();
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadStudents();
    // console.log(this.props);
    // this.check = this.props ? 'asdf' : 'qwer';
  }

  chooseStudent(id) {
    this.studentEvent.emit(id);
  }

  submit() {
    this.DB.setStudent(this.form.value);
    this.loadStudents();
    this.form.reset();
  }

  loadStudents(): void {
    this.students = this.DB.students.map((student) => ({
      ...student,
      picked: false,
    }));
  }
}

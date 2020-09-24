import { Component, OnInit } from '@angular/core';
import { ILesson } from '../services/Agenda.interface';
import { DBService } from '../services/db.service';
import { DBClassroomService } from '../services/dbClassroom.service';

@Component({
  selector: 'app-table-classroom',
  templateUrl: './table-classroom.component.html',
  styleUrls: ['./table-classroom.component.scss'],
})
export class TableClassroomComponent implements OnInit {
  studentList;
  lessonList: ILesson[];
  constructor(
    private db_lessons: DBService,
    private db_classroom: DBClassroomService
  ) {}

  ngOnInit(): void {
    this.studentList = this.db_classroom.students;
    this.lessonList = this.db_lessons.lessons;
  }

  
}

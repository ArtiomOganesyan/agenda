import { Injectable } from '@angular/core';
import { ILesson } from './Agenda.interface';
import { DBClassroomService } from './dbClassroom.service';

@Injectable({
  providedIn: 'root',
})
export class DBService {
  constructor() {}

  public get lessons(): Array<ILesson> {
    try {
      const lessons =
        (JSON.parse(localStorage.getItem('DB_Lessons')) as Array<ILesson>) ||
        [];
      if (!lessons.length) {
        return lessons;
      }
      const isLessonTrue = lessons.some((lesson) => {
        return lesson.id;
      });
      if (!isLessonTrue) {
        throw new Error('no valid lesson');
      }
      return lessons;
    } catch (error) {
      console.error('DB SERVICE getter lesson ', error.message);
    }
  }

  public set lessons(v: Array<ILesson>) {
    localStorage.setItem('DB_Lessons', JSON.stringify(v));
  }

  remove(id: string) {
    if (confirm('Уверены, что хотите удалить урок?'))
      this.lessons = this.lessons.filter((lesson) => lesson.id !== id);

    // localStorage.setItem('DB_Lessons', JSON.stringify(this.lessons));
  }

  push(value: ILesson) {
    this.lessons = [
      ...this.lessons,
      {
        ...value,
        id: Math.random().toString(16).slice(2),
      },
    ];
  }
}

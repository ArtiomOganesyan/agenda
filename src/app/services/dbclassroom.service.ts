import { Injectable } from '@angular/core';
import { IStudent } from '../services/Agenda.interface';
import { DBService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class DBClassroomService {
  constructor(private db_lessons: DBService) {}

  public get students(): Array<IStudent> {
    try {
      const students =
        (JSON.parse(localStorage.getItem('DB_Students')) as Array<IStudent>) ||
        [];
      if (!students.length) {
        return students;
      }

      const isStudentsTrue = students.some((student) => student.id);
      if (!isStudentsTrue) throw new Error('no valid student');
      return students;
    } catch (error) {
      console.error(`DB CLASSROOM getter students ${error.message}`);
    }
  }

  public set students(v: Array<IStudent>) {
    localStorage.setItem('DB_Students', JSON.stringify(v));
  }

  setStudent(newStudent: IStudent) {
    this.students = [
      ...this.students,
      {
        ...newStudent,
        id: Math.random().toString(16).slice(2),
        averageGrade: '',
        averageGradeSecond: '',
        lessons: this.db_lessons.lessons.map((lesson) => ({
          title: lesson.title,
          grade: 0,
          id: lesson.id,
        })),
      },
    ];
  }

  remove(student: IStudent) {
    const { id } = student;
    if (confirm('Are you sure you want to remove a student?'))
      this.students = this.students.filter((student) => student.id !== id);
  }

  addGrade(student: IStudent, lessonId: string, grade: string | number) {
    const modifiedStudent = { ...student };
    const lessonGraded = modifiedStudent.lessons.filter(
      (lesson: { id: any }) => lesson.id === lessonId
    )[0];
    lessonGraded.grade = Number(grade);

    modifiedStudent.averageGrade =
      Math.round(
        modifiedStudent.lessons.reduce(
          (acc: number, lesson: { grade: number }) => {
            return acc + lesson.grade;
          },
          0
        ) / modifiedStudent.lessons.length
      ) + '';

    modifiedStudent.averageGradeSecond =
      Math.round(
        (modifiedStudent.lessons.reduce(
          (acc: number, lesson: { grade: number }) => {
            return acc + lesson.grade;
          },
          0
        ) /
          modifiedStudent.lessons.length +
          Number.EPSILON) *
          100
      ) /
        100 +
      '';

    const newStudentArray = this.students;
    const index = newStudentArray.findIndex(
      (student) => student.id === modifiedStudent.id
    );
    newStudentArray.splice(index, 1, { ...modifiedStudent });
    this.students = [...newStudentArray];
    return modifiedStudent;
  }

  syncLessonsAndStudents() {
    let newStudentArray = this.students;
    newStudentArray = newStudentArray.map((student) => {
      const lackingLessons = this.db_lessons.lessons.filter(
        (lesson) =>
          !student.lessons.some(
            (studentLesson) => lesson.id === studentLesson.id
          )
      );
      return {
        ...student,
        lessons: [
          ...student.lessons,
          ...lackingLessons.map((lesson) => ({
            title: lesson.title,
            grade: 0,
            id: lesson.id,
          })),
        ],
      };
    });

    this.students = [...newStudentArray];
  }
}

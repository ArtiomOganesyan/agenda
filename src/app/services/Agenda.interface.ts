export interface ILesson {
  readonly id: string;
  visibility?: boolean;
  title: string;
}

export interface IStudent {
  readonly id: string;
  picked?: boolean;
  lessons: Array<{ title: string; grade: number; id: string }>;
  averageGrade: string;
  averageGradeSecond: string;
  name: string;
}

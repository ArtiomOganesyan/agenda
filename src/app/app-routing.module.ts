import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { HomeComponent } from './home/home.component';
import { LessonScheduleComponent } from './lesson-schedule/lesson-schedule.component';
import { LessonComponent } from './lesson/lesson.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TableClassroomComponent } from './table-classroom/table-classroom.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'classroom', component: ClassroomComponent },
  { path: 'lesson-schedule', component: LessonScheduleComponent },
  { path: 'table', component: TableClassroomComponent },
  { path: 'user', component: UserComponent },
  { path: 'lesson', component: LessonComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

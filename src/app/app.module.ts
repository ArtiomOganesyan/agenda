import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LessonScheduleComponent } from './lesson-schedule/lesson-schedule.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestTestComponent } from './test-test/test-test.component';
import { SomeDirectiveDirective } from './directive/some-directive.directive';
import { TableClassroomComponent } from './table-classroom/table-classroom.component';
import { GradeHighlightDirective } from './services/grade-highlight.directive';
import { NavigationComponent } from './navigation/navigation.component';
import { TestPipePipe } from './test-pipe.pipe';
import { DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserComponent } from './user/user.component';
import { LessonComponent } from './lesson/lesson.component';
import { FormComponent } from './classroom/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    LessonScheduleComponent,
    ClassroomComponent,
    TestTestComponent,
    SomeDirectiveDirective,
    TableClassroomComponent,
    GradeHighlightDirective,
    NavigationComponent,
    TestPipePipe,
    HomeComponent,
    AboutComponent,
    NotFoundComponent,
    UserComponent,
    LessonComponent,
    FormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [DatePipe, TestPipePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

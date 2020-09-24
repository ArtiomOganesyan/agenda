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

@NgModule({
  declarations: [
    AppComponent,
    LessonScheduleComponent,
    ClassroomComponent,
    TestTestComponent,
    SomeDirectiveDirective,
    TableClassroomComponent,
    GradeHighlightDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

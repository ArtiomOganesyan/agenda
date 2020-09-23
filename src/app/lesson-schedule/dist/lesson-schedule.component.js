"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LessonScheduleComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LessonScheduleComponent = /** @class */ (function () {
    function LessonScheduleComponent(DB, DB_Students) {
        this.DB = DB;
        this.DB_Students = DB_Students;
        this.formVisibility = false;
        this.titleLength = 0;
        this.newLessonSubmitted = new core_1.EventEmitter();
        this.getLessons();
    }
    Object.defineProperty(LessonScheduleComponent.prototype, "lessons", {
        get: function () {
            return this.DB.lessons;
        },
        enumerable: false,
        configurable: true
    });
    LessonScheduleComponent.prototype.ngOnInit = function () {
        console.log('hit');
        this.form = new forms_1.FormGroup({
            date: new forms_1.FormControl('', forms_1.Validators.required),
            title: new forms_1.FormControl('', [forms_1.Validators.required]),
            homework: new forms_1.FormControl('', forms_1.Validators.required),
            additionalInfo: new forms_1.FormControl('', forms_1.Validators.required)
        });
    };
    LessonScheduleComponent.prototype.formToggle = function () {
        this.formVisibility = !this.formVisibility;
    };
    LessonScheduleComponent.prototype.infoToggle = function (id) {
        this.propLesson.forEach(function (lesson) {
            if (lesson.id === id)
                lesson.visibility = !lesson.visibility;
            return lesson;
        });
    };
    LessonScheduleComponent.prototype.getLessons = function () {
        this.propLesson = this.lessons.map(function (lesson) { return (__assign(__assign({}, lesson), { visibility: false })); });
    };
    LessonScheduleComponent.prototype.remove = function (id) {
        this.DB.remove(id);
        this.getLessons();
    };
    LessonScheduleComponent.prototype.submit = function () {
        this.DB.push(this.form.value);
        this.formToggle();
        this.form.reset();
        this.getLessons();
        this.DB_Students.syncLessonsAndStudents();
        this.newLessonSubmitted.emit();
    };
    LessonScheduleComponent.prototype.test = function () {
        // console.log(this.form);
        // console.log(this.titleLength);
        // this.DB_Students.syncLessonsAndStudents();
        // this.newLessonSubmitted.emit();
    };
    LessonScheduleComponent.prototype.edit = function (key, id, index) {
        console.log('edit');
    };
    LessonScheduleComponent.prototype.checkMaxLength = function (element) {
        this.titleLength = 0;
        if (element.value.length)
            this.titleLength = element.value.length;
    };
    __decorate([
        core_1.Output()
    ], LessonScheduleComponent.prototype, "newLessonSubmitted");
    LessonScheduleComponent = __decorate([
        core_1.Component({
            selector: 'app-lesson-schedule',
            templateUrl: './lesson-schedule.component.html',
            styleUrls: ['./lesson-schedule.component.scss']
        })
    ], LessonScheduleComponent);
    return LessonScheduleComponent;
}());
exports.LessonScheduleComponent = LessonScheduleComponent;

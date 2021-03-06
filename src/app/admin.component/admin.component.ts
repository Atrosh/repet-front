import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../models/User';
import { Organisation } from '../models/Organisation';
import { LessonDto } from '../models/LessonsDto';
import { Course } from '../models/Course';
/**
 * Created by vladr on 21.12.2016.
 */

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html'
})

export class AdminComponent implements OnInit {

  public users: User[];
  public roles = [];
  public organisations: Organisation[];
  public courses: Course[];
  public newUser = new User([{role: 'ROLE_USER'}]);
  public newOrganisation = new Organisation();
  public newLessons: LessonDto = new LessonDto();
  public time: string = '12:00';

  constructor(public auth: AuthService, private api: ApiService) {
  }

  public ngOnInit() {
    this.getAllUsers();
    this.getAllRoles();
    this.getAllCourses();
    this.getAllOrganisations();
  }

  public getAllUsers() {
    this.api.getAllUsers().subscribe(
      (data) => this.users = data,
      (error) => console.log(error)
    );
  }

  public getAllRoles() {
    this.api.getRoles().subscribe(
      (data) => this.roles = data,
      (error) => console.log(error)
    );
  }

  public getAllOrganisations() {
    this.api.getOrganisations().subscribe(
      (data) => {
        this.organisations = data;
        this.newUser.organisation = this.organisations[0];
      },
      (error) => console.log(error)
    );
  }

  public getAllCourses() {
    this.api.getCourses().subscribe(
      (data) => {
        this.courses = data;
        this.newLessons.course = this.courses[0];
      },
      (error) => console.log(error)
    );
  }

  public createUser() {
    this.api.createNewUser(this.newUser).subscribe(
      (data) => this.users.push(data),
      (error) => console.log(error)
    );
    this.newUser = new User([{role: 'ROLE_USER'}]);
    this.newUser.organisation = this.organisations[0];
  }

  public deleteUser(id) {
    this.api.deleteUser(id).subscribe();
    this.users = this.users.filter((user) => user.id !== id);
  }

  public deleteCourse(id) {
    this.api.deleteCourse(id).subscribe();
    this.courses = this.courses.filter((course) => course.id !== id);
  }

  public createOrganisation() {
    this.api.createOrganisation(this.newOrganisation).subscribe(
      (data) => this.organisations.push(data),
      (error) => console.log(error)
    );
    this.newOrganisation = new Organisation();
  }

  public deleteOrganisation(id) {
    this.api.deleteOrganisation(id).subscribe();
    this.organisations = this.organisations.filter((organisation) => organisation.id !== id);
  }

  public createLessons() {
    let tmp = this.newLessons.since;
    this.newLessons.since = this.newLessons.since + 'T' + this.time + ':00Z';
    this.api.createLessons(this.newLessons).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.newLessons.since = tmp;
  }

}

/*
* Specific-content component to show data about user-tracking
*/
import { Component, OnInit, Input } from '@angular/core';
import { Organization } from 'src/model/models';
import { DataService } from 'src/app/services/data.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-content-track-users',
  templateUrl: './content-track-users.component.html',
  styleUrls: ['./content-track-users.component.css']
})
export class ContentTrackUsersComponent implements OnInit {
  /*
  * The actual organization selected
  */
  private actualOrganization: Organization;

  /*
  * The number of users actually inside the organization's perimeter
  */
  private presentUsersOrg;

  /*
  * An observable of an organization
  */
  private organization: Organization;

  /*
  * A string to store the coordinates of the organization's perimeter in json format
  */
  private jsonCoordinates: string;

  /*
  * The coordinates of the organization's perimeter
  */
  private perimeterCoordinates;

  constructor( private ds: DataService, private activatedRoute: ActivatedRoute ) {
  //  this.presentUsersOrg = this.getUsers();
  }

  get getActualOrg(): Organization {
    return this.actualOrganization;
  }

  set setActualOrg(value: Organization) {
    this.actualOrganization = value;
  }

  get getPresentUsersOrg() {
    return this.presentUsersOrg;
  }

  set setPresentUsersOrg(value) {
    this.presentUsersOrg = value;
  }

  get geOrganization(): Organization {
    return this.organization;
  }

  set setOrganization(value: Organization) {
    this.organization = value;
  }

  get getJsonCoordinates(): string {
    return this.jsonCoordinates;
  }

  set setJsonCoordinates(value: string) {
    this.jsonCoordinates = value;
  }

  get getPerimeterCoordinates() {
    return this.perimeterCoordinates;
  }

  set setPerimeterCoordinates(value) {
    this.perimeterCoordinates = value;
  }
  /*
  * Set presentUsersOrg at the number of the users actually inside the organization's perimeter
  */
 /* getUsers() {
    // fetches data from the database

    // todo
  }*/

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe((data: {org: Organization}) => { this.actualOrganization = org.subs; } );
    this.activatedRoute.data.subscribe((data: {orgs: Array<Organization>}) => {
      /*this.ds.org.emit(data.org);*/
      console.log('Loading first org\'s coordinates');
      this.actualOrganization = data.orgs[0];
      this.jsonCoordinates = this.actualOrganization.trackingArea;
      this.perimeterCoordinates = JSON.parse(this.jsonCoordinates).Organizzazioni;
      console.log('orgs loaded!');
    });
    console.log('onInit end');
    // this.ds.getOrganization.subscribe((org: Organization) => {  });

   // this.ds.org.subscribe((org: Organization) => { this.organization = org, this.ds.users_number.emit(this.presentUsersOrg);  });
  }



}

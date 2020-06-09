import { Component, OnInit, } from '@angular/core';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {Organization, OrganizationDeletionRequest, OrganizationService} from '../../../../index';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';



@Component({
  selector: 'app-organization-management-content',
  templateUrl: './organization-management-content.component.html',
  styleUrls: ['./organization-management-content.component.css']
})
export class OrganizationManagementContentComponent implements OnInit {

  private name: string;
  private street: string;
  private number: string;
  private postCode: number;
  private city: string;
  private country: string;
  private descr: string;
  private descrR: string;
  private currentOrganization: Organization;
  private change = 'modify';
  modifyForm: FormGroup;
  constructor(private ads: AdministratorOrganizationDataService, private orgS: OrganizationService) { }

  ngOnInit(): void {
    this.setupModifyForm();
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.currentOrganization = org;
      this.name = this.currentOrganization.name;
      this.street = this.currentOrganization.street;
      this.number = this.currentOrganization.number;
      this.postCode = this.currentOrganization.postCode;
      this.city = this.currentOrganization.city;
      this.country = this.currentOrganization.country;
      this.descr = this.currentOrganization.description;
    });
  }

  private setupModifyForm() {
    this.modifyForm = new FormGroup({
      Name: new FormControl(this.name),
      Street: new FormControl(this.street),
      Number: new FormControl(this.number),
      PostCode: new FormControl(this.postCode),
      City: new FormControl(this.city),
      Country: new FormControl(this.country),
      Descr: new FormControl(this.descr),
      DescrR: new FormControl(this.descrR, [
        Validators.required,
        Validators.minLength(100)
        ]),
    });
  }

  onChange(val: string) {
    this.change = val;
  }

  onModify() {
      const d = new Date();
      const modOrg = this.currentOrganization;
      if (this.checkStringValidity(this.name)) {
        modOrg.name = this.name;
      }

      if (this.checkStringValidity(this.street)) {
        modOrg.street = this.street;
      }

      if (this.checkStringValidity(this.number)) {
        modOrg.number = this.number;
      }

      if (this.checkNumberValidity(this.postCode)) {
        modOrg.postCode = this.postCode;
      }

      if (this.checkStringValidity(this.city)) {
        modOrg.city = this.city;
      }

      if (this.checkStringValidity(this.city)) {
        modOrg.country = this.country;
      }

      if (this.checkStringValidity(this.descr)) {
        modOrg.description = this.descr;
      }

      this.orgS.updateOrganization(modOrg).subscribe(() => {
        this.currentOrganization = modOrg;
        alert('Modifica all\'organizzazione effettuata.');
        this.currentOrganization.lastChangeDate = d;
      }, (err: HttpErrorResponse) => {
        if (err.status === 400) {
          alert('Errore. I dati inseriti non sono validi' + err.message);
        } else {
          alert(err.message);
        }
      } );

      this.name = null;
      this.street = null;
      this.number = null;
      this.postCode = null;
      this.city = null;
      this.country = null;
      this.descr = null;
  }

  checkStringValidity(str: string) {
    return str !== undefined && str !== null && str.trim().length > 0;
  }

  checkNumberValidity(x: number) {
    return x !== undefined && x !== null && x > 0;
  }

  onRemove() {
    const delReq: OrganizationDeletionRequest = {
      organizationId: this.currentOrganization.id,
      requestReason: this.descrR,
      administratorId: localStorage.getItem('uid')
    };
// metti controlo max 512
    this.orgS.requestDeletionOfOrganization(delReq).subscribe(() => { alert('Richiesta di eliminazione inviata.'); }, (err: HttpErrorResponse) => {
        alert(err.message);
      } );
    this.descrR = null;
  }
  get Name(): string {
    return this.name;
  }

  set Name(value: string) {
    this.name = value;
  }

  get Street(): string {
    return this.street;
  }

  set Street(value: string) {
    this.street = value;
  }

  get Number(): string {
    return this.number;
  }

  set Number(value: string) {
    this.number = value;
  }

  get PostCode(): number {
    return this.postCode;
  }

  set PostCode(value: number) {
    this.postCode = value;
  }

  get City(): string {
    return this.city;
  }

  set City(value: string) {
    this.city = value;
  }

  get Country(): string {
    return this.country;
  }

  set Country(value: string) {
    this.country = value;
  }

  get Descr(): string {
    return this.descr;
  }

  set Descr(value: string) {
    this.descr = value;
  }
  get DescrR(): string {
    return this.descrR;
  }

  set DescrR(value: string) {
    this.descrR = value;
  }
  get getCurrentOrg(): Organization {
    return this.currentOrganization;
  }

  set setCurrentOrg(value: Organization) {
    this.currentOrganization = value;
  }
  get Change(): string {
    return this.change;
  }

  set Change(value: string) {
    this.change = value;
  }
}

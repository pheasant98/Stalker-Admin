/*
* Shows the number of users currently inside the organization's perimeter
*/
import { Component, OnInit} from '@angular/core';
import { Organization } from 'src/model/models';
import {/*ActivatedRoute,*/ NavigationEnd, Router} from '@angular/router';
import {OrganizationTrackingDataService} from '../../../services/OrganizationTrackingData.service';
import { Subscription} from 'rxjs';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-content-track-users-number',
  templateUrl: './organization-presence-number.component.html',
  styleUrls: ['./organization-presence-number.component.css']
})
export class OrganizationPresenceNumberComponent implements OnInit {
  private currentOrganization: Organization; // contain the current organization
  refreshTimer; // time for refresh
  private trackedUsersCounter: number; // number of user into organization
  private subscriptionToOrgPresenceCounter: Subscription;
  private ctx;
  private presenceChart; // contain the tacking char
  chartData: number[] = []; // contain the data of the tacking char
  chartLabels: string[] = [];  // contain the labels of the tacking char

  constructor(private tds: OrganizationTrackingDataService, private ads: AdministratorOrganizationDataService/*, private activatedRoute: ActivatedRoute*/, private router: Router) { }
  ngOnInit(): void {
    this.subscribeToCounter();
    this.ads.getOrganization.subscribe((o: Organization) => {
      if (o != null) {
        this.currentOrganization = o;
        this.tds.subscribeOrganizationPresenceCounter(this.currentOrganization.id);
      }
    });
    this.subscribeToNavigationEvents();
    this.setCounterRefreshInterval(5000);


    this.ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.presenceChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Utenti attualmente presenti',
          data: this.chartData,
        }]
      },
      options: {
        elements: {
          line: {
            tension: 0,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              maxTicksLimit: 13,
              min: 0,
            }
          }]
        }
      }
    });
  }
  /*
  Subscribe to event route
  */
  subscribeToNavigationEvents(): void {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd && ev.urlAfterRedirects !== this.router.getCurrentNavigation().initialUrl) {
        clearInterval(this.refreshTimer);
      }
    });
  }
  /*
  Subscribe to counter of user into place
  */
  subscribeToCounter(): void {
    this.subscriptionToOrgPresenceCounter = this.tds.getUsersNumber.subscribe((n: number) => {
      this.trackedUsersCounter = n;
      if (this.chartData.length > 10) {

        this.chartData.shift();
        this.chartLabels.shift();
      }
      this.chartData.push(this.trackedUsersCounter);
      const d = new Date();
      this.chartLabels.push('' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '');
      this.presenceChart.update();
    });
  }
  /*
  Set refresh interval of the counter
   */
  setCounterRefreshInterval(ms: number): void {
    this.refreshTimer = setInterval(() => {
      this.tds.subscribeOrganizationPresenceCounter(this.currentOrganization.id);
      this.subscriptionToOrgPresenceCounter.unsubscribe();
      this.subscribeToCounter();
    }, ms);
  }

  get getCurrentOrganization(): Organization {
    return this.currentOrganization;
  }

  get TrackedUsersCounter(): number {
    return this.trackedUsersCounter;
  }
}

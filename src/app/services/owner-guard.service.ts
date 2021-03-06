import {Router, CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OwnerGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> |  Promise<boolean> | boolean {
    if (localStorage.getItem('perm') === '3') {
      return true;
    } else {
      this.router.navigateByUrl('/Content-panel');
      return false;
    }
  }
}

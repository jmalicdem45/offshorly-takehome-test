import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor (private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const roleString = sessionStorage.getItem('auth');
    if (!roleString) {
      this.router.navigate(['login']);
      return false;
    }

    const parsedRole = JSON.parse(roleString);
   
    if (parsedRole.loggedIn !== 'user') {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }

  
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor (private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    const roleString = sessionStorage.getItem('auth');

    if (!roleString) {
      return true;
    }
    const parsedRole = JSON.parse(roleString);

    if (parsedRole.loggedIn === 'user' || parsedRole.loggedIn === 'admin') {
      this.router.navigate([parsedRole.loggedIn])
      return false;
    }

    return true;
  }
  
}

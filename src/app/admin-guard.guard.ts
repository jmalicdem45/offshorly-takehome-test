import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

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
   
    if (parsedRole.loggedIn !== 'admin') {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
  
}

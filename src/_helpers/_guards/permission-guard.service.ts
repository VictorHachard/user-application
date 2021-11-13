import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionUserGuardService implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    for (let role of this.authenticationService.currentUserValue.roleDtoList!) {
      if (role.name === 'ROLE_USER') {
        return true;
      }
    }
    return false;
  }

}

@Injectable({
  providedIn: 'root'
})
export class PermissionAdministratorGuardService implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    for (let role of this.authenticationService.currentUserValue.roleDtoList!) {
      if (role.name === 'ROLE_ADMINISTRATOR') {
        return true;
      }
    }
    return false;
  }

}

@Injectable({
  providedIn: 'root'
})
export class PermissionOwnerGuardService implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    for (let role of this.authenticationService.currentUserValue.roleDtoList!) {
      if (role.name === 'ROLE_OWNER') {
        return true;
      }
    }
    return false;
  }

}


import { Injectable } from '@angular/core';
import { GlobalEventsManager } from '../core/event/global.event';
import {
    Router,
    CanActivate,
    ActivatedRoute,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';

@Injectable()

export class ScopeGuardService implements CanActivate {

    currentscopes: any;

    constructor( public router: Router, private globalEventsManager: GlobalEventsManager ) {
        this.currentscopes = JSON.parse(localStorage.getItem('scopes'));
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.globalEventsManager.addMenu.emit(true);
        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        let expectedScopes, is_access = false;
        expectedScopes = route.data.expectedScopes;
        expectedScopes.map((scope, key) => {
            if (this.currentscopes.indexOf(scope) > -1) {
                is_access = true;
            }
        });
        if (is_access) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}

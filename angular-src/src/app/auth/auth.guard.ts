import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {
    }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        if (this.auth.isAuthenticated()) {
            // this.router.navigate(['/chat']);
            console.log('AUTH GUARD PASSED');
            return true;
        } else {
            console.log('BLOCKED BY AUTH GUARD');
            this.router.navigate(['/login']);
            return false;
        }
    }
}

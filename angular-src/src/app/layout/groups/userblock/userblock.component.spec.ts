/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { UserblockComponent } from './userblock.component';
import { UserblockService } from './userblock.service';
import { AuthService } from '../../../auth/auth.service';
describe('Component: Userblock', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserblockService, AuthService]
        }).compileComponents();
    });

    it('should create an instance', async(inject([UserblockService, AuthService], (userBlockService, authService) => {
        let component = new UserblockComponent(userBlockService, authService);
        expect(component).toBeTruthy();
    })));
});

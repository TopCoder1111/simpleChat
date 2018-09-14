/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { UserListComponent } from './userlist.component'
import { RouterModule, Router } from '@angular/router';

import { UserService } from '../../core/user_service/user.service';
import { SettingsService } from '../../core/settings/settings.service';

describe('Component: UserList', () => {
    let mockRouter = {
        navigate: jasmine.createSpy('navigate')
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserService,
                SettingsService,
                { provide: Router, useValue: mockRouter }
            ]
        }).compileComponents();
    });

    it('should create an instance', async(inject([UserService, SettingsService, Router], (userService, settingsService, router) => {
        let component = new UserListComponent(userService, settingsService, router);
        expect(component).toBeTruthy();
    })));
});

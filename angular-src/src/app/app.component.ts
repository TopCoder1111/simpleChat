import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare var $: any, ga: Function;


import { SettingsService } from './core/settings/settings.service';
import { ApiService } from './providers/apiservice';
import { AuthService } from './auth/auth.service';
import {UserService} from './core/user_service/user.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @HostBinding('class.layout-fixed') get isFixed() { return this.settings.layout.isFixed; }
    @HostBinding('class.aside-collapsed') get isCollapsed() { return this.settings.layout.isCollapsed; }
    @HostBinding('class.layout-boxed') get isBoxed() { return this.settings.layout.isBoxed; }
    @HostBinding('class.layout-fs') get useFullLayout() { return this.settings.layout.useFullLayout; }
    @HostBinding('class.hidden-footer') get hiddenFooter() { return this.settings.layout.hiddenFooter; }
    @HostBinding('class.layout-h') get horizontal() { return this.settings.layout.horizontal; }
    @HostBinding('class.aside-float') get isFloat() { return this.settings.layout.isFloat; }
    @HostBinding('class.offsidebar-open') get offsidebarOpen() { return this.settings.layout.offsidebarOpen; }
    @HostBinding('class.aside-toggled') get asideToggled() { return this.settings.layout.asideToggled; }
    @HostBinding('class.aside-collapsed-text') get isCollapsedText() { return this.settings.layout.isCollapsedText; }

    constructor(public settings: SettingsService,
        public api: ApiService,
        public auth: AuthService,
        public userSerivce: UserService,
        public router: Router) {}

    async ngOnInit() {
        $(document).on('click', '[href="#"]', e => e.preventDefault());

        // this.api.get('/token').subscribe(data => {

        //     let access_token;
        //     access_token = data.text();
        //     access_token = JSON.parse(access_token);
        //     localStorage.setItem('access_token', access_token['access_token']);
        // });

        this.auth.handleAuthentication();
        await this.userSerivce.getUserList();
    }
}

import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { UserListComponent } from './userList/Userlist.component';
import { HeaderComponent } from './header/header.component';
import { NavsearchComponent } from './header/navsearch/navsearch.component';
import { OffsidebarComponent } from './offsidebar/offsidebar.component';
import { UserblockComponent } from './userList/userblock/userblock.component';
import { UserblockService } from './userList/userblock/userblock.service';
import { FooterComponent } from './footer/footer.component';

import { SharedModule } from '../shared/shared.module';
import {UserItemComponent} from './user-item/user-item.component'
@NgModule({
    imports: [
        SharedModule
    ],
    providers: [
        UserblockService
    ],
    declarations: [
        LayoutComponent,
        UserListComponent,
        UserblockComponent,
        HeaderComponent,
        NavsearchComponent,
        OffsidebarComponent,
        FooterComponent,
        UserItemComponent
    ],
    exports: [
        LayoutComponent,
        UserListComponent,
        UserblockComponent,
        HeaderComponent,
        NavsearchComponent,
        OffsidebarComponent,
        FooterComponent
    ]
})
export class LayoutModule { }

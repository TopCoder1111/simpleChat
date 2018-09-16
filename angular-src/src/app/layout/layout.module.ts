import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { NavsearchComponent } from './header/navsearch/navsearch.component';
import { OffsidebarComponent } from './offsidebar/offsidebar.component';
import { UserblockComponent } from './groups/userblock/userblock.component';
import { UserblockService } from './groups/userblock/userblock.service';
import { FooterComponent } from './footer/footer.component';
import {GroupsComponent} from './groups/groups.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports: [
        SharedModule
    ],
    providers: [
        UserblockService
    ],
    declarations: [
        LayoutComponent,
        UserblockComponent,
        HeaderComponent,
        NavsearchComponent,
        OffsidebarComponent,
        FooterComponent,
        GroupsComponent
    ],
    exports: [
        LayoutComponent,
        UserblockComponent,
        HeaderComponent,
        NavsearchComponent,
        OffsidebarComponent,
        FooterComponent,
        GroupsComponent
    ]
})
export class LayoutModule { }

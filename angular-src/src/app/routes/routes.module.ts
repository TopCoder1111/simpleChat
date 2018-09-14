import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatorService } from '../core/translator/translator.service';
import { UserService } from '../core/user_service/user.service';
import { SharedModule } from '../shared/shared.module';
import { routes } from './routes';
import { PagesModule } from './pages/pages.module';
import { GlobalEventsManager } from '../core/event/global.event';
import { UserComponent } from './users/user/user.component';
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes),
        PagesModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [UserComponent]
})

export class RoutesModule {
    constructor(public userlists: UserService, tr: TranslatorService, public globalEventsManager: GlobalEventsManager) {
    }
}

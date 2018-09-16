import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { routes } from './routes';
import { PagesModule } from './pages/pages.module';
import { GlobalEventsManager } from '../core/event/global.event';
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes),
        PagesModule
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})

export class RoutesModule {
    constructor(public globalEventsManager: GlobalEventsManager) {
    }
}

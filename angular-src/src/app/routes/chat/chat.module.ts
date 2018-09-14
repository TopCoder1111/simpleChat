import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ChatComponent } from './chat/chat.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', component: ChatComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
    ],
    declarations: [ChatComponent],
    exports: [
        RouterModule
    ]
})
export class ChatModule { }

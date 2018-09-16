import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { Routes, RouterModule } from '@angular/router';
import { UsernameDialogComponent } from './username-dialog/username-dialog.component';

const routes: Routes = [
    { path: '', component: ChatRoomComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
    ],
    declarations: [ChatRoomComponent, UsernameDialogComponent],
    entryComponents: [UsernameDialogComponent],
    exports: [
        RouterModule
    ]
})
export class ChatRoomModule { }

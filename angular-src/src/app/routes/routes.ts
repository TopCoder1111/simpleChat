import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { Component } from '@angular/core';
export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'chat',
                loadChildren: './chat/chat.module#ChatModule',
            },
            {
                path: 'room/:id',
                loadChildren: './chat-room/chat-room.module#ChatRoomModule',
            }
        ],
        canActivate: [AuthGuard]
    },
    // Not lazy-loaded routes
    { path: 'login', component: LoginComponent },
    // Not found
    { path: '**', redirectTo: 'chat' }
];

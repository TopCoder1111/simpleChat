import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.dev-appspot';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
    isDevelopment = !environment.production;
    constructor() {
    }

    ngOnInit() {
        
    }

}

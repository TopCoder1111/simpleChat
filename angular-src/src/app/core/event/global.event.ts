import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class GlobalEventsManager {
    public addMenu: EventEmitter<any> = new EventEmitter();
}

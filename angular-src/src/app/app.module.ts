
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { Http, RequestOptions } from '@angular/http';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';
import { HttpModule } from '@angular/http';
import { ApiService } from './providers/apiservice';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { FirebaseService } from './core/firebase/firebase.service';
import { GlobalEventsManager } from './core/event/global.event';
import { SettingsService } from './core/settings/settings.service';
import { AlertDialogService } from './providers/alert-dialog.service';
// https://github.com/ocombe/ng2-translate/issues/218

import { registerLocaleData } from '@angular/common';
import localeUs from '@angular/common/locales/en-US-POSIX';
import { Router } from '@angular/router';
import { environment } from '../environments/environment.dev-appspot';

registerLocaleData(localeUs, 'en-US-POSIX');


export function authHttpServiceFactory(http: Http,  options: RequestOptions, router: Router, alertDialog: AlertDialogService) {
}

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        HttpModule,
        BrowserAnimationsModule, // required for ng2-tag-input
        CoreModule,
        LayoutModule,
        SharedModule.forRoot(),
        RoutesModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule.enablePersistence(),
        AngularFireDatabaseModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'en-US' },
        AlertDialogService,
        AuthService,
        GlobalEventsManager,
        SettingsService,
        AuthGuard,
        FirebaseService,
        ApiService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

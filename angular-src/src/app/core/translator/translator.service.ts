import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.dev-appspot';
import { Observable } from 'rxjs/Observable';
import { retry } from 'rxjs/operator/retry';
import 'rxjs/add/operator/retry';

const API_URL = environment.apiUrl;

@Injectable()
export class TranslatorService {

    private defaultLanguage = 'en';

    private availablelangs = [
        { code: 'en', text: 'English' },
        { code: 'es_AR', text: 'Spanish' }
    ];

    constructor(public translate: TranslateService, public http: HttpClient) {
        if (!translate.getDefaultLang()) {
            translate.setDefaultLang(this.defaultLanguage);
        }
        this.useLanguage();
    }

    useLanguage(lang: string = null) {
        lang = lang || this.translate.getDefaultLang();
        // this.translate.use(lang || this.translate.getDefaultLang());
        this.http.get(`${API_URL}/translate?lang=${lang}`)
        .retry(3)
        .subscribe((response) => {
            this.translate.setTranslation(lang, response, true);
        }, (err) => {
            console.log(`Failed setting language contents ${JSON.stringify(err)}`);
        });
    }

    getAvailableLanguages() {
        return this.availablelangs;
    }

}

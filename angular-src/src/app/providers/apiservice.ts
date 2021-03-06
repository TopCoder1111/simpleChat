import { NgModule, Injectable } from '@angular/core';
import { Headers, Http, Response,RequestOptions, RequestOptionsArgs, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev-appspot';

const API_URL = environment.apiUrl;


@NgModule({
  imports: [
    HttpModule,
    HttpClientModule
  ]
})

@Injectable()
export class ApiService {

    private headers: Headers = new Headers();
    private requestOptions: RequestOptionsArgs = {};
    private apiServer: string = API_URL;
    // private apiServer: string = 'http://localhost:3000';

    constructor(public http: Http) {
        let accessToken = localStorage.getItem('access_token');
        // this.headers.set('Content-Type', 'application/json');
        this.headers.set('Authorization', `Bearer ${accessToken}`);
        this.headers.set('Access-Control-Allow-Origin', '*');
        this.requestOptions.headers = this.headers;
    }



    getHeaders(): Headers {
        return this.headers;
    }

    setHeader(key: string, value: string) {
        this.headers.set(key, value);
    }

    removeHeader(key: string) {
        this.headers.delete(key);
    }

    get(endPoint: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.get(this.createUrl(endPoint), this.getRequestOptions(options));
    }

    post(endPoint: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.post(this.createUrl(endPoint), body, this.getRequestOptions(options));
    }

    put(endPoint: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        delete body.id;
        return this.http.put(this.createUrl(endPoint), body, this.getRequestOptions(options));
    }


    delete(endPoint: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.delete(this.createUrl(endPoint), this.getRequestOptions(options));
    }


    patch(endPoint: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.patch(this.createUrl(endPoint), body, this.getRequestOptions(options));
    }

    head(endPoint: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.head(this.createUrl(endPoint), this.getRequestOptions(options));
    }


    options(endPoint: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.post(this.createUrl(endPoint), this.getRequestOptions(options));
    }

    createUrl(endPoint): string {
        let url = this.apiServer + endPoint;
        if (!endPoint.startsWith('/')) {
            url = this.apiServer + '/' + endPoint;
        }
        return url;
    }

    getRequestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        this.requestOptions.headers = this.headers;
        if (options) {
            Object.assign(options, this.requestOptions);
        }
        return this.requestOptions;
    }


}
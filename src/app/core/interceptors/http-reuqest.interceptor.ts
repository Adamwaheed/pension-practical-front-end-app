import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';

import {catchError, tap} from 'rxjs/operators';
import {AppService} from '../services/app.service';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private appService: AppService,
                private router: Router,) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Accept: 'application/json',
                Authorization: `${localStorage.getItem('token')}`
            }
        });

        this.appService.setLoading(true);

        return next.handle(request)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        this.appService.setLoading(false);
                        console.log('Loading....finished');
                    }
                }),
                catchError((err, caught) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                            this.router.navigate(['/login']);
                            return EMPTY;
                        }
                        this.appService.setLoading(false);

                        return throwError(err);
                    }
                    return EMPTY;
                })
            ) as any;
    }


}

import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public loader$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    constructor() { }

    setLoading(status: boolean): void {
        this.loading$.next(status);
        this.loader$.next(status);
    }

    getLoading(): Observable<boolean> {
        return this.loading$;
    }

    getLoader(): Observable<boolean> {
        return this.loader$;
    }
    // tslint:disable-next-line:typedef
    setLoader(status: boolean) {
        this.loader$.next(status);
    }
}

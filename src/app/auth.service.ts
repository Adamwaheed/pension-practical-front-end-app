import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpBaseServiceService} from './http-base-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpBaseServiceService {

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    super();
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.BASEURL+'auth/signin', data);
  }

  setToken(token: string): void {
    localStorage.setItem('token', 'Bearer '+token);
  }
}

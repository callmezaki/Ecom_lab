import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = localStorage.getItem('userLogged');
    let token = '';
    if (user) {
      token = JSON.parse(user).jwt;
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(request);
  }
}

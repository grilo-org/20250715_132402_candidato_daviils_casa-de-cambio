import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from "@angular/common/http";
import {inject, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {environment} from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const platformId = inject(PLATFORM_ID);
  const apiKey = environment.apiKey;
  let newReq = req;

  if (isPlatformBrowser(platformId)) {
    newReq = req.clone({
      setHeaders: {
        'x-api-key': apiKey
      }
    });
  }

  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};

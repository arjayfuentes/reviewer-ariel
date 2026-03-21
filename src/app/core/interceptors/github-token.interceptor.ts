import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const githubTokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('api.github.com') || req.url.includes('raw.githubusercontent.com')) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${environment.githubToken}`,
        Accept: 'application/vnd.github+json',
      },
    });
    return next(authReq);
  }
  return next(req);
};

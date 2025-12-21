import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  NgxAwesomePopupModule,
  ToastNotificationConfigModule,
} from '@costlydeveloper/ngx-awesome-popup';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AuthInterceptorService } from './app/auth/services/auth-interceptor.service';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    importProvidersFrom(
      NgxAwesomePopupModule.forRoot({
        colorList: {
          success: '#00d1b2',
        },
      }),
      ToastNotificationConfigModule.forRoot({
        globalSettings: {
          allowedNotificationsAtOnce: 5,
        },
      }),
    ),
  ],
}).catch((err) => console.error(err));

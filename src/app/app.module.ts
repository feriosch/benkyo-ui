import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  NgxAwesomePopupModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './login/login.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    LoginModule,
    VocabularyModule,
    AppRoutingModule,
    NgxAwesomePopupModule.forRoot({
      ColorList: {
        Success: '#00d1b2'
      }
    }),
    ToastNotificationConfigModule.forRoot({
      GlobalSettings: {
        AllowedNotificationsAtOnce: 5
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

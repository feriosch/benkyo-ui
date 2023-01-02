import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  NgxAwesomePopupModule,
  ToastNotificationConfigModule,
} from '@costlydeveloper/ngx-awesome-popup';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { KanjiModule } from './kanji/kanji.module';
import { GrammarModule } from './grammar/grammar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxAwesomePopupModule.forRoot({
      ColorList: {
        Success: '#00d1b2',
      },
    }),
    ToastNotificationConfigModule.forRoot({
      GlobalSettings: {
        AllowedNotificationsAtOnce: 5,
      },
    }),
    AppRoutingModule,
    SharedModule,
    AuthModule,
    VocabularyModule,
    KanjiModule,
    GrammarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

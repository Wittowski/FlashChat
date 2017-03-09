import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//provider 
import { AuthService } from '../providers/authService';
import { RegisterService } from '../providers/registerService';
import { SearchService } from '../providers/searchService';

//page
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SnmInstructionPage } from '../pages/snm-instruction/snm-instruction';
import { MainPage } from '../pages/main/main';
import { ChatPage } from '../pages/chat/chat';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    SnmInstructionPage,
    MainPage,
    ChatPage
    
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    SnmInstructionPage,
    MainPage,
    ChatPage
  ],
  providers: [AuthService, RegisterService, SearchService, Storage, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

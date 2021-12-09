import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogInComponentComponent } from './log-in-component/log-in-component.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from '@angular/material/card';
import {logInService} from "./log-in-component/Service/logInService";
import {CookieService} from "ngx-cookie-service";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import { RegisterPopupComponent } from './log-in-component/register-popup/register-popup.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatChipsModule} from "@angular/material/chips";
import { FeedComponent } from './feed/feed.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatMenuModule} from "@angular/material/menu";
import { IntroductionPanelComponent } from './feed/introduction-panel/introduction-panel.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { IntroductionRequestComponent } from './feed/introduction-panel/introduction-request/introduction-request.component';
import {MatStepperModule} from "@angular/material/stepper";
import { UserPanelComponent } from './feed/user-panel/user-panel.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatListModule} from "@angular/material/list";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ObjectiveUserTabComponent } from './feed/user-panel/objective-user-tab/objective-user-tab.component';
import { SearchUserTabComponent } from './feed/user-panel/search-user-tab/search-user-tab.component';
import { BottomSheetComponent } from './feed/user-panel/search-user-tab/bottom-sheet/bottom-sheet.component';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import { SearchFriendsTabComponent } from './feed/user-panel/search-friends-tab/search-friends-tab.component';
import {shareMessage} from "./Services/shareMessage";
import { FriendPanelComponent } from './feed/friend-panel/friend-panel.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import {MatSliderModule} from "@angular/material/slider";
import { IntroductionMessageDialogComponent } from './feed/introduction-message-dialog/introduction-message-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    LogInComponentComponent,
    RegisterPopupComponent,
    FeedComponent,
    UpdateUserComponent,
    FeedComponent,
    IntroductionPanelComponent,
    IntroductionRequestComponent,
    UserPanelComponent,
    ObjectiveUserTabComponent,
    SearchUserTabComponent,
    BottomSheetComponent,
    SearchFriendsTabComponent,
    FriendPanelComponent,
    IntroductionMessageDialogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        HttpClientModule,
        MatToolbarModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatGridListModule,
        MatMenuModule,
        MatExpansionModule,
        MatStepperModule,
        MatRadioModule,
        MatListModule,
        MatSnackBarModule,
        MatSliderModule,
        MatDialogModule,
        MatSnackBarModule
    ],
  providers: [logInService, MatBottomSheet, shareMessage],
  bootstrap: [AppComponent]
})
export class AppModule { }

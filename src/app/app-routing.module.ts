import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {LogInComponentComponent} from "./log-in-component/log-in-component.component";
import {FeedComponent} from "./feed/feed.component";
import {UpdateUserComponent} from "./update-user/update-user.component";

const routes: Routes = [
  { path: '', component: LogInComponentComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'update', component: UpdateUserComponent}
];

@NgModule({
  imports: [
    RouterModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

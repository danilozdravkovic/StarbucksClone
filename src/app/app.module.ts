import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout/main-layout.component';
import { MainLayoutModule } from './main-layout/main-layout.module';
import { SharedModule } from './shared/shared.module';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes : Routes = [
  {
    path:"",
    redirectTo: "main",
    pathMatch:"full"
  },
  {
    path:"main",
    component:MainLayoutComponent,
    children : [
      {
        path:"",
        loadChildren: ()=> import("./home/home.module").then(m=>m.HomeModule)
      },
      {
        path:"menu",
        loadChildren: ()=> import("./menu/menu.module").then(m=>m.MenuModule)
      }
    ]
  },
  {
    path:"**",
    component:PageNotFoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule.forRoot(routes),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

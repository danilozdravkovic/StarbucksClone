import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout/main-layout.component';
import { SharedModule } from './shared/shared.module';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { MainLayoutModule } from './main-layout/main-layout.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainInterceptor } from './shared/interceptors/main.interceptor';
import { authGuard } from './shared/guards/auth.guard';



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
      },
      {
        path:"account",
        loadChildren: ()=> import("./account/account.module").then(m=>m.AccountModule)
      },
      {
        path:"**",
        component:PageNotFoundComponent
      }
    ]
  },
  {
    path:"adminPanel",
    loadChildren: ()=> import("./admin-panel-layout/admin-panel-layout.module").then(m=>m.AdminPanelLayoutModule),
    canActivate:[authGuard]
  },
  {
    path:"**",
    redirectTo:"main/",
    pathMatch:"full"
  }
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule.forRoot(routes),
    SharedModule,
    MainLayoutModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MainInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

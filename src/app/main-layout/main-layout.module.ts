import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/header/components/logo/logo.component';
import { NavbarComponent } from './components/header/components/navbar/navbar.component';
import { AuthFormComponent } from './components/header/components/auth-form/auth-form.component';
import { SvgIconsComponent } from './components/footer/components/svg-icons/svg-icons.component';
import { LinksSectionComponent } from './components/footer/components/links-section/links-section.component';
import { NewsletterComponent } from './components/footer/components/newsletter/newsletter.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    NavbarComponent,
    AuthFormComponent,
    SvgIconsComponent,
    LinksSectionComponent,
    NewsletterComponent
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule
  ]
})
export class MainLayoutModule { }

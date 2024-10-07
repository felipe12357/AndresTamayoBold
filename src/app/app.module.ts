import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { DinamicContentDirective } from './directives/dinamic-content.directive';
import { TransactionStatePipe } from './pipes/transaction-state.pipe';
import { FirstUppercasePipe } from './pipes/first-uppercase.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    DinamicContentDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HeaderComponent,

  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

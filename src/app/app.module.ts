import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { LayoutModule } from './layout/layout.module';
import { AboutComponent } from './routing/about/about.component';
import { HomeComponent } from './routing/home/home.component';

import { ParallaxDirective } from './components/parallax/parallax.directive';
import { ParallaxComponent } from './components/parallax/parallax.component';

import { MapComponent } from './components/map/map.component';

import { D3Component } from './components/d3/d3.component';

import { HttpClientModule } from '@angular/common/http';
import { GithubService } from './services/github.service';
import { GithubComponent } from './components/github/github.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,

    ParallaxDirective,
    ParallaxComponent,

    MapComponent,
    D3Component,
    GithubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule
  ],
  providers: [
    GithubService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from "@angular/http";

import {AppComponent} from './app.component';
import {AppService} from "./app.service";
import {D3Component} from './d3.component';

@NgModule({
    declarations: [
        AppComponent,
        D3Component,
    ],
    imports: [
        BrowserModule,
        HttpModule,
    ],
    providers: [AppService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

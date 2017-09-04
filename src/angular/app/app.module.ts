import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from "@angular/http";

import {AppComponent} from './app.component';
import {AppService} from "./app.service";
import {ChartsComponent} from './charts.component';

@NgModule({
    declarations: [
        AppComponent,
        ChartsComponent,
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

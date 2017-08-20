import {Component, OnInit} from '@angular/core';
import {AppService} from "./app.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    message: string;

    constructor(private messageService: AppService) {
    }

    ngOnInit(): void {
        this.messageService.getMessage()
            .then(message => {
                    this.message = message;
                    console.log(`Got message: ${message}`);
                },
                reason => console.log(`Problem getting a message, reason: ${reason}`));
    }
}

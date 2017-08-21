import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class AppService {

    constructor(private http: Http) {
    }

    getMessage(): Promise<string> {
        return this.http.get("/json")
            .toPromise()
            .then(response => response.json().message);
    }
}

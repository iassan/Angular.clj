import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'd3',
    templateUrl: './d3.component.html',
})
export class D3Component implements OnInit {

    constructor() {
    }

    ngOnInit() {
        let body = d3.selectAll("p");
        let div = body.append("div");
        div.html("d3p: Hello, world!");
    }
}

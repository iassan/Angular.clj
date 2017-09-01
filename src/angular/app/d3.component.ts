import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'd3',
    templateUrl: './d3.component.html',
    styleUrls: ['./d3.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class D3Component implements OnInit {

    constructor() {
    }

    ngOnInit() {
        const data = [
            {name: "a", value: 4},
            {name: "b", value: 8},
            {name: "c", value: 15},
            {name: "d", value: 16},
            {name: "e", value: 23},
            {name: "fff", value: 42}
        ];
        const chartWidth = 500,
            barHeight = 20;
        let scale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([0, 500]);
        let chart = d3.select(".chart")
            .attr("width", chartWidth)
            .attr("height", barHeight * data.length);
        let bar = chart.selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", (d, i) => "translate(0," + i * barHeight + ")");
        bar.append("rect")
            .attr("width", d => scale(d.value))
            .attr("height", barHeight - 1);
        bar.append("text")
            .attr("x", d => scale(d.value) - 3)
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .text(d => d.name);
    }
}

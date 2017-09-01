import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import bar from 'britecharts/dist/umd/bar.min.js';
import colors from 'britecharts/dist/umd/colors.min.js'
import Plottable from 'plottable/plottable.js'

class Value {
    name: string;
    value: number;
}

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
        const data: Value[] = [
            {name: "a", value: 4},
            {name: "b", value: 8},
            {name: "c", value: 15},
            {name: "d", value: 16},
            {name: "e", value: 23},
            {name: "f", value: 42}
        ];
        this.drawUsingPureD3(data);
        this.drawUsingBriteCharts(data);
        this.drawUsingPlottable(data);
    }

    private drawUsingBriteCharts(data: Value[]) {
        let barChart = new bar();
        let barContainer = d3.select('.chart2');

        barChart
            .colorSchema(colors.colorSchemas.britecharts)
            .width(500)
            .height(250);

        barContainer.datum(data).call(barChart);
    }

    private drawUsingPureD3(data: Value[]) {
        const margin = {top: 20, right: 30, bottom: 30, left: 40},
            chartWidth = 500 - margin.left - margin.right,
            chartHeight = 250 - margin.top - margin.bottom;

        let x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([0, chartWidth])
            .padding(.1);
        let y = d3.scaleLinear()
            .range([chartHeight, 0])
            .domain([0, d3.max(data, d => d.value)]);

        let chart = d3.select(".chart1")
            .attr("width", chartWidth + margin.left + margin.right)
            .attr("height", chartHeight + margin.top + margin.bottom)
            .append("g").attr("transform", "translate(" + margin.left + "," + margin.right + ")");
        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + chartHeight + ")")
            .call(d3.axisBottom(x));
        chart.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y));
        chart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("value");
        chart.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.value))
            .attr("height", d => chartHeight - y(d.value))
            .attr("width", x.bandwidth());
    }

    private drawUsingPlottable(data: Value[]) {
        let xScale = new Plottable.Scales.Category();
        let yScale = new Plottable.Scales.Linear();

        let xAxis = new Plottable.Axes.Category(xScale, "bottom");
        let yAxis = new Plottable.Axes.Numeric(yScale, "left");

        let plot = new Plottable.Plots.Bar()
            .addDataset(new Plottable.Dataset(data))
            .x(d => d.name, xScale)
            .y(d => d.value, yScale)
            .animated(true);

        new Plottable.Components.Table([
            [yAxis, plot],
            [null, xAxis]
        ])
            .renderTo("div#chart3");
    }
}

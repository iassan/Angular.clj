import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import Plottable from 'plottable/plottable.js'
import Chart from 'chart.js/dist/Chart.bundle.js'
import {AppService} from "./app.service";
import {TickerValue} from "./ticker-value";
import * as vega from 'vega/build/vega.js';
import * as vl from 'vega-lite/build/vega-lite.js';

@Component({
    selector: 'charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class ChartsComponent implements OnInit {

    constructor(private messageService: AppService) {
    }

    ngOnInit() {
        this.messageService.getTickerValues()
            .then(d => ChartsComponent.drawCharts(d));
    }

    private static drawCharts(tickerData: TickerValue[]) {
        ChartsComponent.drawUsingPureD3(tickerData);
        ChartsComponent.drawUsingPlottable(tickerData);
        ChartsComponent.drawUsingChartJs(tickerData);
        ChartsComponent.drawUsingVegaLite(tickerData);
    }

    private static drawUsingChartJs(data: TickerValue[]) {
        let ctx = document.getElementById("myChartJSChart");
        new Chart.Line(ctx, {
            data: {
                datasets: [{
                    label: 'ticker',
                    data: data.map(d => {return {x: d.date, y: d.value}}),
                    borderColor: "steelblue",
                    backgroundColor: "steelblue",
                    lineTension: 0,
                    fill: false,
                    pointRadius: 0,
                    pointHitRadius: 3,
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                    }]
                }
            }
        });
    }

    private static drawUsingPureD3(data: TickerValue[]) {
        const margin = {top: 20, right: 30, bottom: 30, left: 40},
            chartWidth = 800 - margin.left - margin.right,
            chartHeight = 400 - margin.top - margin.bottom;

        let x = d3.scaleTime()
            .domain(d3.extent(data, d => d.date))
            .range([0, chartWidth]);
        let y = d3.scaleLinear()
            .domain(d3.extent(data, d => d.value))
            .range([chartHeight, 0]);
        let line = d3.line<TickerValue>()
            .x(d => x(d.date))
            .y(d => y(d.value));

        let chart = d3.select("#myPureD3Chart")
            .attr("width", chartWidth + margin.left + margin.right)
            .attr("height", chartHeight + margin.top + margin.bottom);
        let g = chart
            .append("g").attr("transform", "translate(" + margin.left + "," + margin.right + ")");
        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + chartHeight + ")")
            .call(d3.axisBottom(x));
        g.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y));
        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("value");
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);
    }

    private static drawUsingPlottable(data: TickerValue[]) {
        let xScale = new Plottable.Scales.Time();
        let yScale = new Plottable.Scales.Linear();

        let xAxis = new Plottable.Axes.Time(xScale, "bottom");
        let yAxis = new Plottable.Axes.Numeric(yScale, "left");

        let yLabel = new Plottable.Components.AxisLabel("Value", "270");

        let plot = new Plottable.Plots.Line()
            .addDataset(new Plottable.Dataset(data))
            .x(d => d.date, xScale)
            .y(d => d.value, yScale)
            .animated(true);

        new Plottable.Components.Table([
            [yLabel, yAxis, plot],
            [null, null, xAxis]
        ])
            .renderTo("div#myPlottableChart");
    }

    private static drawUsingVegaLite(data: TickerValue[]) {
        let vegaLiteSpec = {
            $schema: "https://vega.github.io/schema/vega-lite/v2.json",
            width: 739,
            height: 297,
            description: "sth",
            data: {values: data},
            mark: "line",
            encoding: {
                x: {field: "date", type: "temporal", timeUnit: "yearmonthdate", axis: {title: "x"}},
                y: {field: "value", type: "quantitative", scale: {type: "linear", domain: d3.extent(data, d => d.value)}}
            }
        };
        let vegaSpec = vl.compile(vegaLiteSpec).spec;
        console.log(vegaSpec);
        new vega.View(vega.parse(vegaSpec))
            .renderer("canvas")
            .initialize("#myVegaLiteChart")
            .hover()
            .run();
    }
}

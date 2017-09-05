import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import line from 'britecharts/dist/umd/line.min.js';
import colors from 'britecharts/dist/umd/colors.min.js'
import Plottable from 'plottable/plottable.js'
import Chart from 'chart.js/dist/Chart.bundle.js'
import {AppService} from "./app.service";
import {TickerValue} from "./ticker-value";

class Value {
    name: string;
    value: number;
}

const data: Value[] = [
    {name: "a", value: 4},
    {name: "b", value: 8},
    {name: "c", value: 15},
    {name: "d", value: 16},
    {name: "e", value: 23},
    {name: "f", value: 42}
];

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
            .then(d => this.drawCharts(d));
    }

    private drawCharts(tickerData: TickerValue[]) {
        this.drawUsingPureD3(data);
        this.drawUsingBriteCharts(tickerData);
        this.drawUsingPlottable(tickerData);
        this.drawUsingChartJs(tickerData);
    }

    private drawUsingChartJs(data: TickerValue[]) {
        let ctx = document.getElementById("chart4");

        let chart = new Chart.Line(ctx, {
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

    private drawUsingBriteCharts(data: TickerValue[]) {
        try {
            let chart = line();
            let chartContainer = d3.select('.chart2');

            chart.colorSchema(colors.colorSchemas.britecharts)
                .width(800)
                .height(400);

            let chartData = {
                topicName: "bla",
                topic: 123,
                dates: data
            };

            chartContainer.datum({dataByTopic: [chartData]}).call(chart);
        } catch (e) {
            console.log(`Problem preparing chart: ${e}`)
        }
    }

    private drawUsingPureD3(data: Value[]) {
        const margin = {top: 20, right: 30, bottom: 30, left: 40},
            chartWidth = 800 - margin.left - margin.right,
            chartHeight = 400 - margin.top - margin.bottom;

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

    private drawUsingPlottable(data: TickerValue[]) {
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
            .renderTo("div#chart3");
    }
}

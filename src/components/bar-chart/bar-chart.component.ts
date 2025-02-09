import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as d3 from 'd3';
import {IFileItem} from '../../interfaces/interfaces';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.less'
})

export class BarChartComponent implements OnInit, OnChanges {
  @Input() sortedData: IFileItem[] = [];

  private svg: any;
  private margin = { top: 20, right: 30, bottom: 40, left: 40 };
  private width = 600 - this.margin.left - this.margin.right;
  private height = 400 - this.margin.top - this.margin.bottom;
  private tooltip: any;
  private colors: any;

  ngOnInit() {
    this.createSvg();
    this.createTooltip();
    this.createColors();
    this.drawChart();
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes['sortedData'] && !changes['sortedData'].firstChange) {
      this.updateChart();
    }
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);
  }

  private drawChart(): void {
    const x = d3.scaleBand()
      .domain(this.sortedData.map(d => d.category))
      .range([0, this.width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.sortedData, d => d.value) || 0])
      .nice()
      .range([this.height, 0]);

    this.svg.append("g")
      .attr("transform", `translate(0,${this.height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "0.3em")
      .attr("dy", "0.8em")
      // .attr("transform", "rotate(-45)");
    this.svg.append("g")
      .call(d3.axisLeft(y));

    this.svg.selectAll("rect")
      .data(this.sortedData)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.category) || 0)
      .attr("y", (d: any) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.value))
      .attr("fill", (d: any, i: number) => this.colors(i))
      .on("mouseover", (event: any, d: any) => this.showTooltip(event, d))
      .on("mouseout", () => this.hideTooltip());


  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(this.sortedData.map((d, i) => i.toString()));
  }

  private createTooltip() {
    this.tooltip = d3.select("figure#bar")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "beige")
      .style("padding", "8px")
      .style("border-radius", "5px")
      .style("font-size", "12px")
      .style("box-shadow", "2px 2px 5px rgba(0,0,0,0.2)")
      .style("text-align", "center");
  }

  private showTooltip(event: any, d: any) {
    this.tooltip
      .style("visibility", "visible")
      .html(`<strong>${d.category}</strong><br>Value: ${d.value}`)
      .style("left", `${event.pageX + 10}px`)
      .style("top", `${event.pageY - 10}px`);
  }

  private hideTooltip() {
    this.tooltip.style("visibility", "hidden");
  }

  private updateChart() {
    this.svg.selectAll('*').remove();
    this.createColors();
    this.drawChart();
  }
}

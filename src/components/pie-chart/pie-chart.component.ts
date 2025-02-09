import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IFileItem} from '../../interfaces/interfaces';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.less'
})

export class PieChartComponent implements OnInit, OnChanges {
  @Input() sortedData: IFileItem[] = [];

  private svg: any;
  private margin = 50;
  private width = 400;
  private height = 400;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;
  private tooltip: any;

  ngOnInit() {
    this.createSvg();
    this.createColors();
    this.createTooltip();
    this.drawChart();
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes['sortedData'] && !changes['sortedData'].firstChange) {
      this.updateChart();
    }
  }

  private createSvg() {
    this.svg = d3.select("figure#pie")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr("transform", `translate(${this.width / 2},${this.height / 2})`);
  }

  private createColors() {
    this.colors = d3.scaleOrdinal()
      .domain(this.sortedData.map(d => d.value.toString()))
      .range(d3.schemeCategory10);
  }

  private drawChart() {
    const pie = d3.pie<any>().value((d: any) => Number(d.value));

    this.svg
      .selectAll('pieces')
      .data(pie(this.sortedData))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(0) // start radius for animation
      )
      .attr('fill', (d: any, i: number) => (this.colors(i)))
      .on('mouseover', (event: any, d: any) => this.showTooltip(event, d))
      .on('mouseout', (event: any, d: any) => this.hideTooltip())
      // animation chart
      .transition()
      .duration(1000) // animation timer ms
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      );

    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.sortedData))
      .enter()
      .append('text')
      .text((d:any) => d.data.category)
      .attr("transform", (d:any) => `translate(${labelLocation.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", 14)
      // animation text
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .style('opacity', 1);
  }

  private createTooltip() {
    this.tooltip = d3.select("figure#pie")
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
  private showTooltip(event: any, d: any): void {
    this.tooltip
      .style("visibility", "visible")
      .html(`<strong>${d.data.category}</strong><br>Value: ${d.data.value}`)
      .style("left", `${event.pageX + 10}px`)
      .style("top", `${event.pageY - 10}px`);
  }

  private hideTooltip(): void {
    this.tooltip.style("visibility", "hidden");
  }

  private updateChart() {
    this.svg.selectAll('*').remove();
    this.createColors();
    this.drawChart();
  }
}

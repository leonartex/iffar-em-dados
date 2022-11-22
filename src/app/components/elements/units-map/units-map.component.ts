import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/shared/model/card.model';
import * as d3 from 'd3';
import * as turf from '@turf/turf';


@Component({
  selector: 'app-units-map',
  templateUrl: './units-map.component.html',
  styleUrls: ['./units-map.component.scss']
})
export class UnitsMapComponent implements OnInit {

  @Input() unitsData: any;
  @Input() mapData: any;

  public units: any = [];
  public cards: Array<Card> = [];

  private svg: any;
  private center: [number, number] = [-54.5, -30];
  private scale = 4200;
  private margin = 20;
  private width = 725 - (this.margin * 2);
  private height = 550 - (this.margin * 2);
  private projection = d3.geoMercator()
    .center(this.center)                // GPS of location to zoom on
    .scale(this.scale)                       // This is like the zoom
    .translate([this.width / 2, this.height / 2])

  constructor() { }

  ngOnInit(): void {
    this.units = this.unitsData;
    this.cards = this.mountCards();
    this.createSvg();
    this.drawMap();
    this.drawUnits();
  }

  private mountCards(){
    let cards: Array<Card> = [];

    let totalCampi = new Card();
    totalCampi.description = "Campi";
    totalCampi.value = this.unitsData.filter((unit: { type: string; }) => unit.type == 'campus' || unit.type == 'advanced-campus').length;
    cards.push(totalCampi);

    return cards;
  }

  private createSvg(): void {
    this.svg = d3.select("figure#map")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")")
      .attr("preserveAspectRatio", "xMidYMid meet");
  }

  private drawMap() {
    let polygon = turf.polygon(this.mapData.geojson.geometry.coordinates);
    console.log(polygon);

    let fixed = turf.rewind(polygon, { reverse: true });
    console.log(fixed)

    this.svg.append("g")
      .selectAll("path")
      .data([fixed])
      .join("path")
      .attr("d", d3.geoPath()
        .projection(this.projection)
      )
      .style("stroke", "#205E3B")
      .style("stroke-width", "10")
      .style("stroke-linecap", "round")
      .style("fill", "#297F3E")

  }

  private drawUnits() {
    this.svg.append('g')
      .classed('cities', true);
      this.drawCitiesMap();
      this.drawUnitsCoords();
  }

  private drawCitiesMap() {
    this.svg.select('.cities')
      .selectAll('.city')
      .data(this.unitsData)
      .join("g")
      .classed('city', true)
      // .selectAll("path")
      // .data((unit: any) => [unit.location.geojson])
      // .join("path")
      // .attr("d", d3.geoPath()
      //   .projection(this.projection)
      // )
  }
  private drawUnitsCoords() {
    this.svg.select('.cities')
      .selectAll('.city')
      .data(this.unitsData)
      .join(".city")
      // .on('mouseover', (ev: any, unit: any) => unitHighlightOnList(unit))
      // .on('mouseout', (ev: any, unit: any) => unitHighlightOnList(null))
      .append("circle")
      .attr("cx", (d: any) => this.projection([d.location.coordinates.lon, d.location.coordinates.lat])![0])
      .attr("cy", (d: any) => this.projection([d!.location.coordinates.lon, d.location.coordinates.lat])![1])
      .style("fill", "white")
      .style("stroke", "#0E3B43")
      .style("stroke-width", "10")
      .style("stroke-linecap", "round")
      .attr("r", 10)
  }

}

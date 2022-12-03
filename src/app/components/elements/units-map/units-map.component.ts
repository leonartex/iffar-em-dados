import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/shared/model/card.model';
import * as d3 from 'd3';
import * as turf from '@turf/turf';
import { StringHelperService } from 'src/app/services/string-helper.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-units-map',
  templateUrl: './units-map.component.html',
  styleUrls: ['./units-map.component.scss']
})
export class UnitsMapComponent implements OnInit {
  public stringHelperService = new StringHelperService();

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.units = this.unitsData;
    this.cards = this.mountCards();
    this.unitsList();
    this.createSvg();
    this.drawMap();
    this.drawUnits();
  }

  private mountCards() {
    let cards: Array<Card> = [];

    let totalCampi = new Card();
    totalCampi.description = "Campi";
    totalCampi.value = this.unitsData.filter((unit: { type: string; }) => unit.type == 'campus' || unit.type == 'advanced-campus').length;
    cards.push(totalCampi);

    return cards;
  }

  private unitsList() {
    d3.select('#units-list')
      .selectAll('li')
      .data(this.unitsData)
      .join('li')
      .on('mouseover', (ev, unit) => this.unitHighlightOnMap(unit))
      .on('mouseout', (ev, unit) => this.unitHighlightOnMap(null))
      .on('focus', (ev, unit) => this.unitHighlightOnMap(unit))
      .on('focusout', (ev, unit) => this.unitHighlightOnMap(null))
      .attr('class', (unit: any) => unit.type)
      .classed('units-list-li', true)
      .append('a')
        .attr('href', (unit: any) => this.unitLink(unit))
        .text((unit: any) => this.unitName(unit))
        .on('focus', (ev, unit) => this.unitHighlightOnMap(unit))
        .on('focusout', (ev, unit) => this.unitHighlightOnMap(null))

  }

  private unitLink(unit: any): string {
    return '/' + this.stringHelperService.urlFriendly(unit.city.cityName);
  }

  private unitName(unit: any): string {
    let type: string;
    switch (unit.type) {
      case 'campus':
        type = 'Campus';
        break;
      case 'advanced-campus':
        type = 'Campus Avançado';
        break;
      case 'rectory':
        type = 'Reitoria';
        break;
      default:
        type = '';
    }
    return `${type} ${unit.city.cityName}`;
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
      .classed('units-map', true)

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
      .on('mouseover', (ev: any, unit: any) => this.unitHighlightOnList(unit))
      .on('mouseout', (ev: any, unit: any) => this.unitHighlightOnList(null))
      .on('focus', (ev: any, unit: any) => this.unitHighlightOnList(unit))
      .on('focusout', (ev: any, unit: any) => this.unitHighlightOnList(null))
      .on('click', (ev: any, unit: any) => this.goToUnit(unit))
      .on('keypress', (ev: any, unit: any) => this.goToUnit(unit, ev))
      .append("circle")
      .attr("cx", (d: any) => this.projection([d.location.coordinates.lon, d.location.coordinates.lat])![0])
      .attr("cy", (d: any) => this.projection([d!.location.coordinates.lon, d.location.coordinates.lat])![1])
      .classed('city-pin', true)
  }

  //https://stackoverflow.com/questions/19919708/change-class-of-one-element-when-hover-over-another-element-d3
  private unitHighlightOnMap(unit: any) {
    this.svg.select('.cities')
      .selectAll('.city')
      .classed('selected', function (mapUnit: any, index: number) {
        console.log(mapUnit);
        if (!unit)
          return false;
        return mapUnit.apiId == unit.apiId;
      })
  }

  private unitHighlightOnList(unit: any) {
    d3.select('#units-list')
      .selectAll('li')
      .classed('selected', function (listUnit:any, index) {
        console.log(listUnit);
        if (!unit)
          return false;

        return listUnit.apiId == unit.apiId;
      })
  }

  private goToUnit(unit: any, ev?: any){
    if(ev == undefined || ev.key == 'Enter')
      this.router.navigate([this.unitLink(unit)]);
  }

}

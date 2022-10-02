// The svg
const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

let center = [-53.5,-30.5];
let scale = 3200;

// Map and projection
const projection = d3.geoMercator()
    .center(center)                // GPS of location to zoom on
    .scale(scale)                       // This is like the zoom
    .translate([ width/2, height/2 ])

// Load external data and boot
let geojson = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

mapa = "http://127.0.0.1:5500/mapa-0.005.json";
// cidade = "http://127.0.0.1:5500/unidades.json"; //data.data[0].city.location.geojson
// cidade = "http://127.0.0.1:5500/jsonv2.json"; //data[0].geojson
// geojson = "http://127.0.0.1:5500/rio-grande-do-sul.geojson";
unidades = "http://127.0.0.1:5500/unidadesList-2.json";

d3.json(mapa).then( function(data){
    // Filter data
    //data.features = data.features.filter(d => {console.log(d.properties.name); return d.properties.name=="France"})
    // console.log(data[0].geo);

    // let fixed = data.features.map(function(feature) {
    //     return turf.rewind(feature,{reverse:true});
    // })

    let polygon = turf.polygon(data[0].geojson.coordinates);
    console.log(polygon);

    let fixed = turf.rewind(polygon,{reverse:true});
    console.log(fixed)

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data([fixed])
        .join("path")
          .attr("d", d3.geoPath()
              .projection(projection)
          )
        .style("stroke", "none")
});

d3.json(unidades).then( function(data){
    unitsList(data.data);
    
    svg.append('g')
        .classed('cities', true);
    drawCitiesMap(data.data);
    unitsMap(data.data);
        // .selectAll('.city')
        // .data(data.data)
        // .join('g')
        //     .classed('city', true)
        //     .on('mouseover', (ev, unit) => unitHighlightOnList(unit))
        //     .on('mouseout', (ev, unit) => unitHighlightOnList(null))
        //     .append("circle")
        //         .attr("cx", d=>projection([d.location.coordinates.lon,d.location.coordinates.lat])[0])
        //         .attr("cy", d=>projection([d.location.coordinates.lon,d.location.coordinates.lat])[1])
        //         .attr("r", 3);
})

function drawCitiesMap(data){
    svg.select('.cities')
        .selectAll('.city')
        .data(data)
        .join("g")
            .classed('city', true)
            .selectAll("path")
            .data(unit => [unit.location.geojson])
            .join("path")
            .attr("d", d3.geoPath()
                .projection(projection)
            )
}

//https://stackoverflow.com/questions/65936103/drawing-circles-via-d3js-and-converting-coordinates
//https://www.d3indepth.com/geographic/
function unitsMap(data){
    svg.select('.cities')
        .selectAll('.city')
        .data(data)
        .join(".city")
            .on('mouseover', (ev, unit) => unitHighlightOnList(unit))
            .on('mouseout', (ev, unit) => unitHighlightOnList(null))
            .append("circle")
                .attr("cx", d=>projection([d.location.coordinates.lon,d.location.coordinates.lat])[0])
                .attr("cy", d=>projection([d.location.coordinates.lon,d.location.coordinates.lat])[1])
                .attr("r", 3);
}

function unitsList(units){
    d3.select('#campus-list')
        .selectAll('li')
        .data(units)
        .join('li')
            .text(unit => unit.type + " " + unit.city.cityName)
            .on('mouseover', (ev, unit) => unitHighlightOnMap(unit))
            .on('mouseout', (ev, unit) => unitHighlightOnMap(null))
}

//https://stackoverflow.com/questions/19919708/change-class-of-one-element-when-hover-over-another-element-d3
function unitHighlightOnMap(unit){
    svg.select('.cities')
        .selectAll('.city')
        .classed('selected', function(mapUnit, index) { 
            console.log(mapUnit);
            if(!unit) 
                return false;
            return mapUnit.apiId == unit.apiId;
        })
}

function unitHighlightOnList(unit){
    d3.select('#campus-list')
        .selectAll('li')
        .classed('selected', function(listUnit, index) { 
            console.log(listUnit);
            if(!unit) 
                return false;
            
            return listUnit.apiId == unit.apiId;
        })
}
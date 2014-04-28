// start slingin' some d3 here.

//===================================
//data entry, either airports / flights
var data = [
  {name: "Cathay Pacific", iata: "CX", fleetSize: 139, airbus: 48, boeing: 91},
  {name: "British Airways", iata: "BA", fleetSize: 277, airbus: 122, boeing: 155},
  {name: "United", iata: "UA", fleetSize: 713, airbus: 48, boeing: 665},
  {name: "Emirates", iata: "EK", fleetSize: 221, airbus: 82, boeing: 139},
  {name: "Lufthansa", iata: "LH", fleetSize: 287, airbus:229 , boeing: 58}
]

//===================================
//constants
var margin = {top: 20, right: 30, bottom: 60, left: 40},
    width = 600 - margin.left - margin.right;
    height = 600 - margin.top - margin.bottom;

//===================================
//initial instantitation
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var scaleX = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1)
    .domain(data.map(function(d){ return d.name; }));

var scaleY = d3.scale.linear() 
    .range([height, 0])
    .domain([0, d3.max(data, function(d){ return d.fleetSize; })]);

var xAxis = d3.svg.axis()
    .scale(scaleX)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(scaleY)
    .orient("left");

var chart = d3.select("svg")
    .attr("class", "chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//===================================
//adding data for axes and bars
chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  .append("text")
    .text("airline")
    .attr("x", width/2 + margin.left/2)
    .attr("dy", "3.2em")
    .style("text-anchor", "end");

chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .text("fleet size")
    .attr("transform", "rotate(-90)")
    .attr("y", "6")
    .attr("dy", ".80em")
    .style("text-anchor", "end");

var fleet = chart.selectAll(".fleet")
    .data(data)
  .enter()

fleet.append("rect")
    .attr("class", "fleet")
    .attr("x", function(d){ return scaleX(d.name); })
    .attr("y", function(d){ return scaleY(d.fleetSize); })
    .attr("height", function(d){ return height - scaleY(d.fleetSize); })
    .attr("width", scaleX.rangeBand()/3);

fleet.append("text")
    .attr("x", function(d) { return scaleX(d.name); })
    .attr("y", function(d){ return scaleY(d.fleetSize); })
    .attr("dy", "1em")
    .text(function(d) { return d.fleetSize + "(T)"; });

//===================================
//extra bars for manufacturer
var airbus = chart.selectAll(".airbus")
    .data(data)
  .enter()

airbus.append("rect")
    .attr("class", "airbus")
    .attr("x", function(d){ return scaleX(d.name)+scaleX.rangeBand()*1/3; })
    .attr("y", function(d){ return scaleY(d.airbus); })
    .attr("height", function(d){ return height - scaleY(d.airbus); })
    .attr("width", scaleX.rangeBand()/3)
  
airbus.append("text")
    .attr("x", function(d) { return scaleX(d.name)+scaleX.rangeBand()*1/3; })
    .attr("y", function(d){ return scaleY(d.airbus); })
    .attr("dy", "1em")
    .text(function(d) { return d.airbus + "(A)"; });


var boeing = chart.selectAll(".boeing")
    .data(data)
  .enter()

boeing.append("rect")
    .attr("class", "boeing")
    .attr("x", function(d){ return scaleX(d.name)+scaleX.rangeBand()*2/3; })
    .attr("y", function(d){ return scaleY(d.boeing); })
    .attr("height", function(d){ return height - scaleY(d.boeing); })
    .attr("width", scaleX.rangeBand()/3);

boeing.append("text")
    .attr("x", function(d) { return scaleX(d.name)+scaleX.rangeBand()*2/3; })
    .attr("y", function(d){ return scaleY(d.boeing); })
    .attr("dy", "1em")
    .text(function(d) { return d.boeing + "(B)"; });
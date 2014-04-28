// start slingin' some d3 here.

//===================================
//data entry, either airports / flights
var data = [
  {name: "Cathay Pacific", iata: "CX", fleetSize: 139, destinations: 112, fleet: [{"airbus": [{"a330-300":36}, {"a340-300":12}]}, {"boeing": [{"b747-400":12}, {"b777-200":5}, {"b777-300":12}, {"b777-300er":39}]} ]},
  {name: "British Airways", iata: "BA", fleetSize: 277, destinations: 169, fleet: [{"airbus": [{"a318-100":2}, {"a319-100":44}, {"a320-200":53}, {"a321-200":18}, {"a380-800":5}]}, {"boeing": [{"b737-400":19}, {"b747-400":55}, {"b767-300er":21}, {"b777-200":3}, {"b777-200er":43}, {"b777-300er":10}, {"b787-8":4}]} ]},
  {name: "United", iata: "UA", fleetSize: 713, destinations: 373, fleet: [{"airbus": [{"a330-300":36}, {"a340-300":12}]}, {"boeing": [{"b747-400":12}, {"b777-200":5}, {"b777-300":12}, {"b777-300er":39}]} ]},
  {name: "Emirates", iata: "EK", fleetSize: 221, destinations: 134, fleet: [{"airbus": [{"a330-300":36}, {"a340-300":12}]}, {"boeing": [{"b747-400":12}, {"b777-200":5}, {"b777-300":12}, {"b777-300er":39}]} ]},
  {name: "Lufthansa", iata: "LH", fleetSize: 287, destinations: 215, fleet: [{"airbus": [{"a330-300":36}, {"a340-300":12}]}, {"boeing": [{"b747-400":12}, {"b777-200":5}, {"b777-300":12}, {"b777-300er":39}]} ]}
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

chart.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d){ return scaleX(d.name); })
    .attr("y", function(d){ return scaleY(d.fleetSize); })
    .attr("height", function(d){ return height - scaleY(d.fleetSize); })
    .attr("width", scaleX.rangeBand());

//===================================






  








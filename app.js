// start slingin' some d3 here.

//===================================
//data entry, either airports / flights

//===================================
//constants

var settings = {
  width: 960,
  height: 600,
  radius: 10,
  duration: 1000
};

//===================================
//initial instantitate
var svg = d3.select("body").append("svg")
    .attr("width", settings.width)
    .attr("height", settings.height);


//===================================
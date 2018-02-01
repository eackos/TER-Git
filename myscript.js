//-----------------------------------------SVG-------------------------------------------

var svg = d3.select("body")
					.append("svg")
					.attr("width", 960)
					.attr("height", 600);
					
var width = svg.attr("width");
var height = svg.attr("height");
   

//---------------------------------------------------------------------------------------

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));
    
										
//-----------------------------------------tableau dynamique-------------------------------

    /*  d3.csv("data.csv", function(data) {
		
		console.log(data);
            var container = d3.select("body")
                .append("table")

                .selectAll("tr")
                .data(data).enter()
                .append("tr")

                .selectAll("td")
               	.data(function(d) { return Object.values(d); })
		.enter()
                .append("td")
                .text(function(d) { return d; });
});*/


	d3.json("data.json", function(data) {
		
						console.log(data);
						
            var div1 = d3.select("body")
								.append("div")
								.attr("id", "div1")
								
								.append("table")
								.attr("class", "table")
   							
                .selectAll("tr")
                .data(data.nodes)
                .enter()
                .append("tr")

                .selectAll("td")
               	.data(function(d) { return Object.values(d); })
								.enter()
                .append("td")
                
                .style("border", "1px black solid")
    						.style("padding", "5px")
    						
                .text(function(d) { return d; });
                
                
                
            var div2 = d3.select("body")
								.append("div")
								.attr("id", "div2")
								
								.append("table")
								.attr("class", "table")
   							
                .selectAll("tr")
                .data(data.links)
                .enter()
                .append("tr")

                .selectAll("td")
               	.data(function(d) { return Object.values(d); })
								.enter()
                .append("td")
                
                .style("border", "1px black solid")
    						.style("padding", "5px")
    						
                .text(function(d) { return d; });
                
  //-------------------------------------link------------------------------------
                
                 var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(data.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });
	
	
//----------------------------------------node-----------------------------------

 var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(data.nodes)
    .enter().append("circle")
      .attr("r", 5)
      .attr("fill", function(d) { return color(d.group); })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
          
//--------------------------------------------------------------------------------------------

 node.append("title")
      .text(function(d) { return d.id; });

  simulation
      .nodes(data.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(data.links);
      
       function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}



var isBricks = false;

function gridData() {
	var data = new Array();
	var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 10;
	var width = 10;
	var height = 10;
	var click = 0;
	
	// iterate for rows	
	for (var row = 0; row < 100; row++) {
		data.push( new Array() );
		
		// iterate for cells/columns inside rows
		for (var column = 0; column < 101; column++) {
			data[row].push({
				x: xpos,
				y: ypos,
				width: width,
				height: height,
				click: click
			})
			// increment the x position. I.e. move it over by 50 (width variable)
			xpos += width;
		}
		// reset the x position after a row is complete
		if (row%2 == 1 || !isBricks){
			xpos = 1;
		} else {
			xpos = -4;
		}
		// increment the y position for the next row. Move it down 50 (height variable)
		ypos += height;	
	}
	return data;
}

function updateGrid() {
	console.log("updateGrid() occurred")

	isBricks = !isBricks;

	d3.selectAll(".square").attr("x", function(d) {
		if(!(d.y % 20)) { 
			if(isBricks){
				d.x = d.x + 5;
			} else {
				d.x = d.x - 5;
			}
		}
		return d.x;
	})
}

var gridData = gridData();	
// I like to log the data to the console for quick debugging
console.log(gridData);

var grid = d3.select("#grid")
	.append("svg")
	.attr("x","500px")
	.attr("width","1001px")
	.attr("height","1500px");
	
var row = grid.selectAll(".row")
	.data(gridData)
	.enter().append("g")
	.attr("class", "row");
	
var column = row.selectAll(".square")
	.data(function (d) { return d; })
	.enter().append("rect")
	.attr("class", "square")
	.attr("x", function (d) { return d.x; })
	.attr("y", function (d) { return d.y; })
	.attr("width", function (d) { return d.width; })
	.attr("height", function (d) { return d.height; })
	.style("fill", "#fff")
	.style("stroke", "#111")
	.on('click', function (d) {
		d.click++;
		if ((d.click) % 2 == 0) { d3.select(this).style("fill", "#fff"); }
		if ((d.click) % 2 == 1) { d3.select(this).style("fill", c_color); } 
	});
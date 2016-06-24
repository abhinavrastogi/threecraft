var diamondSquareTerrain = function(_size) {
	var terrain = [];
	var size = Math.pow(2, _size) + 1;

	// intialize terrain to plains
	for(var i=0; i<size; i++) {
		terrain[i] = new Array(size);
		for(var j=0; j<size; j++) {
			terrain[i][j] = 0;
		}
	}

	// intialize corners to random heights
	terrain[0][0] = Math.random();
	terrain[0][size -1] = Math.random();
	terrain[size -1][0] = Math.random();
	terrain[size -1][size -1] = Math.random();

	var getMidpoint = function(points) {
		var p1 = points[0], p4 = points[3];
		return {
			x: Math.floor((p4.x+p1.x)/2),
			y: Math.floor((p4.y+p1.y)/2)
		}
	};

	var diamondStep = function(points, iteration) {
		var p1 = points[0], p2 = points[1], p3 = points[2], p4 = points[3];
		var sum = 0, count = 0;
		var maxDisp = 0;
		if(p1.x>=0 && p1.x<size && p1.y>=0 && p1.y<size) { sum += terrain[p1.x][p1.y]; count++; maxDisp = terrain[p1.x][p1.y]>maxDisp ? terrain[p1.x][p1.y] : maxDisp; }
		if(p2.x>=0 && p2.x<size && p2.y>=0 && p2.y<size) { sum += terrain[p2.x][p2.y]; count++; maxDisp = terrain[p2.x][p2.y]>maxDisp ? terrain[p2.x][p2.y] : maxDisp; }
		if(p3.x>=0 && p3.x<size && p3.y>=0 && p3.y<size) { sum += terrain[p3.x][p3.y]; count++; maxDisp = terrain[p3.x][p3.y]>maxDisp ? terrain[p3.x][p3.y] : maxDisp; }
		if(p4.x>=0 && p4.x<size && p4.y>=0 && p4.y<size) { sum += terrain[p4.x][p4.y]; count++; maxDisp = terrain[p4.x][p4.y]>maxDisp ? terrain[p4.x][p4.y] : maxDisp; }

		var midpoint = getMidpoint(points);
		var randDisp = (maxDisp/2 - Math.random()*maxDisp)/2;
		terrain[midpoint.x][midpoint.y] = sum/count + randDisp;
	};

	var step = function(points, iteration) {
		iteration = iteration || 0;
		var p1 = points[0], p2 = points[1], p3 = points[2], p4 = points[3];
		// get square center
		var midpoint = getMidpoint([p1,p2,p3,p4]);
		var maxDisp = Math.max(terrain[p1.x][p1.y], terrain[p2.x][p2.y], terrain[p3.x][p3.y], terrain[p4.x][p4.y]);
		var randDisp = (maxDisp/2 - Math.random()*maxDisp)/2;
		if((midpoint.x==p1.x && midpoint.y==p1.y) || (midpoint.x==p2.x && midpoint.y==p2.y) || (midpoint.x==p3.x && midpoint.y==p3.y) || (midpoint.x==p4.x && midpoint.y==p4.y)) {
			return;
		}
		terrain[midpoint.x][midpoint.y] = (terrain[p1.x][p1.y] + terrain[p2.x][p2.y] + terrain[p3.x][p3.y] + terrain[p4.x][p4.y])/4 + randDisp;

		// get diamond points
		var d1 = [{x: p1.x, y: p1.y}, {x: Math.floor(p1.x-(p4.x-p1.x)/2), y: midpoint.y}, {x: midpoint.x, y: midpoint.y}, {x: p2.x, y: p2.y}];
		var d2 = [{x: p2.x, y: p2.y}, {x: midpoint.x, y: Math.floor(p4.y+(p4.y-p1.y)/2)}, {x: midpoint.x, y: midpoint.y}, {x: p4.x, y: p4.y}];
		var d3 = [{x: p1.x, y: p1.y}, {x: midpoint.x, y: midpoint.y}, {x: midpoint.x, y: Math.floor(p1.y-(p4.y-p1.y)/2)}, {x: p3.x, y: p3.y}];
		var d4 = [{x: p3.x, y: p3.y}, {x: midpoint.x, y: midpoint.y}, {x: Math.floor(p3.x+(p4.x-p1.x)/2), y: midpoint.y}, {x: p4.x, y: p4.y}];

		// get diamond centers
		var dc1 = getMidpoint(d1);
		var dc2 = getMidpoint(d2);
		var dc3 = getMidpoint(d3);
		var dc4 = getMidpoint(d4);

		//set terrain for diamond centers
		diamondStep(d1, iteration);
		diamondStep(d2, iteration);
		diamondStep(d3, iteration);
		diamondStep(d4, iteration);

		// make smaller squares, recurse
		step([p1, dc1, dc3, midpoint], iteration+1);
		step([dc1, p2, midpoint, dc2], iteration+1);
		step([dc3, midpoint, p3, dc4], iteration+1);
		step([midpoint, dc2, dc4, p4], iteration+1);
	};

	step([{x: 0, y: 0}, {x: 0, y: size-1}, {x: size-1, y: 0}, {x: size-1, y: size-1}]);

	return terrain;
};

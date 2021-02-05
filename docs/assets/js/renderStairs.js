
renderStairs();


function generateCorners() {
	//would like to let step fit device width
	let deviceWidth = document.documentElement.clientWidth;
	let svgHeight = document.documentElement.clientHeight/2;
	let param_designStep = {
		'frontHeight': 50,
		'frontWidth': 520,
		'backWidth': 480,
		'topleft_dx': 25,
		'topleft_dy': 35
	}

	let ratio = (deviceWidth+50)/520;
	let height = (param_designStep.frontHeight+param_designStep.topleft_dy);
	let offsetLB = {
		'x': -25,
		'y': 65 + svgHeight
	}
	return [
		{//[0] verticle center left
			x: offsetLB.x,
			y: param_designStep.topleft_dy*ratio
				+ offsetLB.y
				- height*ratio
		},
		{//[1] left bottom
			x: offsetLB.x, 
			y: height*ratio
				+ offsetLB.y
				- height*ratio
		},
		{//[2] righ bottom
			x: offsetLB.x + param_designStep.frontWidth*ratio, 
			y: height*ratio
				+ offsetLB.y
				- height*ratio
		},
		{//[3] right verticle center
			x: offsetLB.x + param_designStep.frontWidth*ratio, 
			y: param_designStep.topleft_dy*ratio
				+ offsetLB.y
				- height*ratio
		},
		{//[4] left verticle center
			x: offsetLB.x, 
			y: param_designStep.topleft_dy*ratio
				+ offsetLB.y
				- height*ratio
		},
		{//[5] left top
			x: offsetLB.x + param_designStep.topleft_dx*ratio, 
			y: 0 + offsetLB.y
				- height*ratio
		},
		{//[6] right top
			x: offsetLB.x + param_designStep.topleft_dx*ratio
				+ param_designStep.backWidth*ratio, 
			y:0 + offsetLB.y
				- height*ratio
		},
		{//[7] right verticle center
			x: offsetLB.x + param_designStep.frontWidth*ratio, 
			y: 35*ratio 
				+ offsetLB.y
				- height*ratio
		}
	];
}

function calcGeometricSeries(base, terms) {
	let sum=1;
	for(let i=terms-1; i>0; i--) {
		sum += Math.pow(base, i);
	};
	return sum;
}

function addStair(proto_step, base_info, num_step) {
	let copy = proto_step.clone(true)
	let multi_ratio = calcGeometricSeries(base_info.ratio, num_step);
	let translateTo = {
		'dx': base_info.lb2lt.dx*multi_ratio,
		'dy': base_info.lb2lt.dy*multi_ratio
	}
	let leftTop = {
		'x': base_info.leftBottom.x + translateTo.dx,
		'y': base_info.leftBottom.y + translateTo.dy
	}
	let scale = Math.pow(base_info.ratio, num_step);
	
	let str_style_transf_o =  base_info.leftBottom.x +'px '
								+ base_info.leftBottom.y + 'px';

	let str_style_transf = 'translate(' + translateTo.dx +'px, ' + translateTo.dy + 'px)'
						 	+ 'scale(' + scale + ')';
	copy.style('transform', str_style_transf)
		.attr('data-step-num', num_step);

	return copy;
}

function renderStairs() {
	//generate the fist stair from design
	let pathData = generateCorners();

	//append the backgound svg
	let svg = d3.select('section#svgContainer').append('svg')
		.attr('width', '100%')
		.attr('height', '50vh')
		.attr('id', 'bg_svg')
		.style('position', 'relative')
		.style('overflow', 'visible')
		.style('top', '-30vh')
		.style('opacity', "0.7")
		.style('z-index', "0");

	//append group tag, g 
	let svg_g = svg.append('g');
	svg_g.attr('id', 'stairs');

	//defined line() function for d3.line()
	let line = d3.line().x(function(d){
    		return d.x;
		}).y(function(d){
    		return d.y;
	});
	//draw first step
	let proto_step = svg_g.append('path')
		.attr('d', line(pathData))
		.attr('stroke', 'hsl(0, 10%, 70%)')
    	.attr('stroke-width', '1px')
    	.attr('fill', 'none')
    	.attr('data-step-num', 0)
    	.style('transform-origin', String(pathData[1].x)+"px "+String(pathData[1].y)+"px");

    //base information to build stairs
	let base_coor = {
		'leftBottom': pathData[1],
		'lb2lt': {
			'dx':pathData[5].x-pathData[1].x,
			'dy':pathData[5].y-pathData[1].y
		},
		'ratio': (pathData[6].x-pathData[5].x)/(pathData[2].x-pathData[1].x)
	}
	
	//addStair(proto_step, base_coor, 1);
	//addStair(proto_step, base_coor, 2);

	//generate stairs response with device height
	let height_canvas = d3.select("#bg_svg").node().getBoundingClientRect().height;
	let height_stairs = d3.select("#stairs").node().getBBox().height;
	let count_stairs = 1;
	while(height_stairs < height_canvas) {
		addStair(proto_step, base_coor, count_stairs);
		count_stairs++;
		height_stairs = d3.select('#stairs').node().getBBox().height;
	}

	//add one more stair
	let last_stair = addStair(proto_step, base_coor, count_stairs);
	last_stair.style('opacity', 0);


}


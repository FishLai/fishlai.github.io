
//renderPerson();

// initial step paraem 50 520 dy35 dx25 480
function renderPerson() {
	//calc ratio real/design
	var stair_width = document.getElementById('bg_svg').width.baseVal.value + 50;
	var ratio_design = stair_width/520;

	//calc length for (d3)getPointAtLength();
	var path_len = (50+520+50+130)*ratio_design;
	//choose a stair
	var stair = d3.select('path[data-step-num="1"]');
	var pointOnStep = stair.node().getPointAtLength(path_len);
	
	//get svg canvas to append elements
	var svg = d3.select('svg');
	var g_p = svg.append('g').attr('id', 'person');
	
	//calc person height base on stair height
	var person_height = (170*(50/20))*ratio_design;

	//decide offset point from getPointAtLength()
	var offset_onStep = {dx: 10, dy: -10}

	// generate data list for right leg and left leg
	var listD_r_leg = genLegD({x:pointOnStep.x + offset_onStep.dx, y:pointOnStep.y + offset_onStep.dy},
								 person_height*(5.5/10));
	var listD_l_leg = genLegD({x:pointOnStep.x - offset_onStep.dx, y:pointOnStep.y + offset_onStep.dy},
								 person_height*(5.5/10));

	//get transform and transform-origin at 2nd step
	var str_transf = stair.node().style.transform;
	var str_transf_o = stair.style('transform-origin');
	
	//define draw line function
	var line = d3.line().x(function(listData) {
		return listData.x;
	}).y(function(listData) {
		return listData.y;
	});
	//create right leg and left leg objects
	var r_leg = g_p.append('path')
					.attr('d', line(listD_r_leg))
					.style('stroke', 'black')
					.style('stroke-width', '3px')
					.style('transform', str_transf)
					.style('transform-origin', str_transf_o)
					.attr('id', 'r_leg');
	
	var l_leg = g_p.append('path')
					.attr('d', line(listD_l_leg))
					.style('stroke', 'black')
					.style('stroke-width', '3px')
					.style('transform', str_transf)
					.style('transform-origin', str_transf_o)
					.attr('id', 'l_leg');

	//define body parameters and create body object
	var w_body = person_height*(3/20);
	var h_body = person_height*(3.5/10);
	var body_D = {
		x: pointOnStep.x - w_body/2,
		y: pointOnStep.y - person_height*(9/10) + offset_onStep.dy,
		w: w_body,
		h: h_body
	};
	var body = g_p.append('rect')
					.attr('x', body_D.x)
					.attr('y', body_D.y)
					.attr('width', body_D.w)
					.attr('height', body_D.h)
					.style('fill', 'hsl(0, 40%, 100%)')
					.style('stroke', 'black')
					.style('stroke-width', '1px')
					.style('transform', str_transf)
					.style('transform-origin', str_transf_o)
					.attr('id', 'person_body');

	//define head and create head object
	var w_head = person_height*(1/10);
	var h_head = person_height*(1/10);
	var head_D = {
		x: pointOnStep.x - w_head/2,
		y: pointOnStep.y - person_height + offset_onStep.dy,
		w: w_head,
		h: h_head
	}

	var head = g_p.append('rect')
					.attr('x', head_D.x)
					.attr('y', head_D.y)
					.attr('width', head_D.w)
					.attr('height', head_D.h)
					.style('fill', 'hsl(0, 40%, 100%)')
					.style('stroke', 'black')
					.style('stroke-width', '1px')
					.style('transform', str_transf)
					.style('transform-origin', str_transf_o);

	//define and create left and right arms
	var body_path_len = w_body + person_height*(1/20);
	var param_r_arm = {
		startPoint: body.node().getPointAtLength(body_path_len),
		curveP1: {x:person_height*(1/40), y:person_height*(1/20)},
		curveP2: {x:person_height*(1/20), y:person_height*(1/10)},
		toEnd: {x:0, y:person_height*(7/20)}

	}
	var path_r_arm = genDPathWithCurve(param_r_arm);
	var r_arm = g_p.append('path')
					.attr('d', path_r_arm)
					.style('stroke', 'black')
					.style('stroke-width', '3px')
					.style('transform', str_transf)
					.style('transform-origin', str_transf_o)
					.style('fill', 'none');

	body_path_len = body.node().getTotalLength()-person_height*(1/20);
	var param_l_arm = {
		startPoint: body.node().getPointAtLength(body_path_len),
		curveP1: {x:-person_height*(1/40), y:person_height*(1/20)},
		curveP2: {x:-person_height*(1/20), y:person_height*(1/10)},
		toEnd: {x:0, y:person_height*(7/20)}
	}
	var path_l_arm = genDPathWithCurve(param_l_arm);
	var l_ram = g_p.append('path')
					.attr('d', path_l_arm)
					.style('stroke', 'black')
					.style('stroke-width', '3px')
					.style('transform', str_transf)
					.style('transform-origin', str_transf_o)
					.style('fill', 'none');

	//generate svg path.curve data
	function genDPathWithCurve(param) {
		return "m"+ String(param.startPoint.x) +"," +String(param.startPoint.y)
			+"c"+String(param.curveP1.x)+","+String(param.curveP1.y)
			+" "+String(param.curveP2.x)+","+String(param.curveP2.y)
			+" "+String(param.toEnd.x)+","+String(param.toEnd.y);
	};

	//generate data list for line()
	function genLegD(origin, leg_len) {
		return [
			origin,
			{x: origin.x, y: origin.y-leg_len*(5/8)},
			{x: origin.x, y: origin.y-leg_len}
		];
	};
}


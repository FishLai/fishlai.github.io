
function upStairsAnimation(speed) {
	let num_stairs = d3.select('#stairs').selectChildren().nodes().length;
	let last_stair = d3.select('path[data-step-num="'+String(num_stairs-1)+'"]');
	let first_stair = d3.select('path[data-step-num="0"]');
	let str_last_transf = last_stair.node().style.transform;

	//change each step to forward step
	const upSpeed = speed;
	for(i=1; i<num_stairs; i++) {
		this_stair = d3.select('path[data-step-num="'+String(i)+'"]');
		forward_stair = d3.select('path[data-step-num="'+String(i-1)+'"]');
		str_transf = forward_stair.node().style.transform;
		if (i != num_stairs-1) {
			this_stair.transition()
				.duration(upSpeed)
				.ease(d3.easeLinear)
				.style('transform', str_transf);
		} else {
			this_stair.transition()
				.duration(upSpeed)
				.ease(d3.easeLinear)
				.style('transform', str_transf)
				.style('opacity', 1);
		}
	}

	//change first step to last
	first_stair.style('opacity', 0)
		.style('transform', str_last_transf);

	//reset the order of stairs
	for(i=0; i<num_stairs; i++) {
		new_order = i-1;
		d3.select('path[data-step-num="'+String(i)+'"]')
			.attr('data-step-num', new_order);
	}
	d3.select('path[data-step-num="-1"]')
		.attr('data-step-num', num_stairs-1);
}

function upStairs(speed) {
	
	//want to find scale value
	let re = /(?:scale\()+([0-9.]*)/;
	let str_style_transf = d3.select('[data-step-num="1"]').node().style.transform;
	let base_scale = parseFloat(str_style_transf.match(re)[1]);

	upStairsAnimation(speed);

}

/*
	//
var stair_widt = document.document.Element.clientWidth + 50;
var scale = stair_width/520;
var p_len = (50+520+50+260)scale -10;
var step = d3.select('path[data-step-num="1"]');
var r_foot_p = step.node().getPointAtLength(p_len);

*/
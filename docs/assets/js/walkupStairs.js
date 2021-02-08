walkUpStair();

function walkUpStair() {
	//create motional path object group
	var g_mp = d3.select('svg').append('g')
								.attr('id', 'motional_path')
								.style('display', 'none');
	//create motional path of right/left legs
	var mp_r = g_mp.append('path').attr('id', 'mp_r');
	var mp_l = g_mp.append('path').attr('id', 'mp_l');

	//set path points
	//get right/left legs
	var r_leg = d3.select('#r_leg');
	var l_leg = d3.select('#l_leg');
	var leg_len = r_leg.node().getTotalLength();
	var calf_len = leg_len*(5/8);
	//calc parameters of up one stair with stairs
	var stair2 = d3.select('path[data-step-num="1"]');
	var str_transf = stair2.style('transform');
	var str_transf_o = stair2.style('transform-origin');
	var upTo = getStyleTranslatePoint(str_transf);

	var param_r_leg = {
		pos_r_foot: r_leg.node().getPointAtLength(0),
		pos_r_butt: r_leg.node().getPointAtLength(leg_len)	
	}
	var param_l_leg = {
		pos_l_foot: l_leg.node().getPointAtLength(0),
		pos_l_butt: l_leg.node().getPointAtLength(leg_len)
	}

	//create path.d function
	var curve = d3.line(d => d.x, d => d.y)
					.curve(d3.curveNatural);

	//right/left foot motional position
	var offset_x = 20*(document.getElementById('bg_svg').width.baseVal.value/320);
	var data_r_mp = [
		param_r_leg.pos_r_foot,
		{
			x: (param_r_leg.pos_r_foot.x+param_r_leg.pos_r_foot.x+upTo.dx-offset_x)/2, 
			y: param_r_leg.pos_r_foot.y+upTo.dy-4.25
		},
		{
			x: param_r_leg.pos_r_foot.x+upTo.dx-offset_x, 
			y: param_r_leg.pos_r_foot.y+upTo.dy
		}
	]
	var data_l_mp = [
		param_l_leg.pos_l_foot,
		{
			x: (param_l_leg.pos_l_foot.x+param_l_leg.pos_l_foot.x+upTo.dx-offset_x)/2, 
			y: param_l_leg.pos_l_foot.y+upTo.dy-4.25
		},
		{
			x: param_l_leg.pos_l_foot.x+upTo.dx-offset_x, 
			y: param_l_leg.pos_l_foot.y+upTo.dy
		}
	]

	mp_r.attr('d', curve(data_r_mp))
		.style('stroke', 'red')
		.style('stroke-width', '1px')
		.style('fill', 'none')
		.style('transform-origin', str_transf_o)
		.style('transform', str_transf);

	mp_l.attr('d', curve(data_l_mp))
		.style('stroke', 'red')
		.style('stroke-width', '1px')
		.style('fill', 'none')
		.style('transform-origin', str_transf_o)
		.style('transform', str_transf);
	
	function getStyleTranslatePoint(str_transform) {
		let regex = /(?:translate\()+([\-0-9.]*)+(?:px,\s)+([0-9.\-]*)/;
		let match = str_transform.match(regex);
		return {dx: parseFloat(match[1]), dy: parseFloat(match[2])};
	}
}


class raiseFootAnimate {
	constructor() {
		this.mp_r = d3.select('#mp_r');
		this.mp_l = d3.select('#mp_l');
		this.mp_len = this.mp_r.node().getTotalLength();
		this.r_leg = d3.select('#r_leg').style('fill', 'none');
		this.l_leg = d3.select('#l_leg').style('fill', 'none');
		this.leg_origin_r = this.r_leg.attr('d');
		this.leg_origin_l = this.l_leg.attr('d');
		this.leg_len = this.r_leg.node().getTotalLength();
		this.calf_len = this.leg_len*(5/8);
		this.line = d3.line().x(d => d.x).y(d => d.y);
		this.move_len = 0;
		this.speed = 700;
		this.infinite = false;
	}

	async raiseFootR(speed) {
		let move_len = this.move_len;
		let pos_butt = this.r_leg.node().getPointAtLength(this.leg_len);
		let pos_foot = this.mp_r.node().getPointAtLength(move_len);
		let pos_knee = {
			x: pos_foot.x,
			y: pos_foot.y - this.calf_len
		};
		let data_pos = [pos_foot, pos_knee, pos_butt];
		this.r_leg.attr('d', this.line(data_pos));

		if(move_len <= this.mp_len) {
			window.requestAnimationFrame((speed)=>this.raiseFootR(speed));
			this.move_len += this.mp_len*0.05;
		} else {
			await upStairs(this.speed);
			await this.r_leg.transition()
					.duration(this.speed)
					.ease(d3.easePolyOut.exponent(0.82))
					.attr('d', this.leg_origin_r)
				.end();
			this.move_len = 0;
			if(this.infinite) {
				this.raiseFootL(this.speed);
			}
		}
	}
	async raiseFootL(speed) {
		let move_len = this.move_len;
		let pos_butt = this.l_leg.node().getPointAtLength(this.leg_len);
		let pos_foot = this.mp_l.node().getPointAtLength(move_len);
		let pos_knee = {
			x: pos_foot.x,
			y: pos_foot.y - this.calf_len
		};
		let data_pos = [pos_foot, pos_knee, pos_butt];
		this.l_leg.attr('d', this.line(data_pos));

		if(move_len <= this.mp_len) {
			window.requestAnimationFrame((speed)=>this.raiseFootL(speed));
			this.move_len += this.mp_len*0.05;
		} else {
			await upStairs(this.speed);
			await this.l_leg.transition()
					.duration(this.speed)
					.ease(d3.easePolyOut.exponent(0.82))
					.attr('d', this.leg_origin_l)
				.end();
			this.move_len = 0;
			if(this.infinite){
				this.raiseFootR(this.speed);
			}
		}
	}

}

var walkUp = new raiseFootAnimate();
//walkUp.raiseFootR(walkUp.speed = 750);

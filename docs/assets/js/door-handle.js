var raiseStair = null;
var isOrientationChange = false;

function setDeviceRatio() {
	let ratio = window.innerHeight/window.innerWidth;
	if(Math.floor(ratio) < 1) {
		document.documentElement.style.setProperty('--h_w', ratio);
	} else {
		ratio = 1/ratio;
		document.documentElement.style.setProperty('--h_w', ratio);
	}
}

function transformToResume() {
	//append door border class
	let el_door = document.getElementById("doorContainer");
	el_door.classList.add("door-border");

	//use transform semulate open door
	door.style.animation = "opendoor linear forwards 4s";

	//magnify main element to do walk in
	el_door.style.animation = "walkin forwards 4s 2.5s";
};

function afterDoorAnimate() {
	// remove door border
	let el_door = document.getElementById('doorContainer');
	el_door.classList.remove('door-border');

	
	
	//remove opendoor animation
	let door = document.getElementById('door');
	door.style.animation = "";

	//remove walkin animation
	let doorContainer = document.getElementById('doorContainer');
	doorContainer.style.animation = "";

	//hide my brief introduction card
	doorContainer.style.display = 'none';

	//DOM_section, resume fade in
	let DOM_resume = document.getElementById('svgContainer');
	DOM_resume.style.display = 'block';
	DOM_resume.style.opacity = 1;

	let DOM_content = document.getElementById('content');
	DOM_content.style.transform = "translateX(0)";

	//after open the door render stair background
	setupStair();

	//add resize listener for rerender
	var bg_svg = d3.select('#bg_svg');
	window.addEventListener('resize', () => {
		if(isOrientationChange) {
			raiseStair = null;
			bg_svg.selectChildren('g').remove();
			setupStair();
		};
	}, {capture:false});
}

function setupStair() {
	renderStairs();
	renderPerson();
	walkUpStair();
	raiseStair = new raiseFootAnimate();
	walkUpWithScroll();
}

window.addEventListener('load', function() {
	setDeviceRatio();
	let door_handleDoc = document.getElementById('door-handle').contentDocument;
	let svgImg = door_handleDoc.getElementById('layer1');
	svgImg.addEventListener('click', transformToResume, false);

	let DOM_door = document.getElementById('doorContainer');
	DOM_door.addEventListener('animationend', afterDoorAnimate, false);


});

function walkUpWithScroll() {
	var div_content = document.getElementById('content');
	var onWalk = raiseStair.infinite;
	var isScrolling;
	var scroll_times = 0;
	
	div_content.addEventListener('scroll', walkWithScroll, false);
	function walkWithScroll () {
		if(!Boolean(scroll_times%2) && !onWalk) {
			onWalk = raiseStair.infinite = true;
			raiseStair.raiseFootR(raiseStair.speed = 750);
		} else if( Boolean(scroll_times%2) && onWalk) {
			onWalk = raiseStair.infinite = false;
		};
		window.clearTimeout(isScrolling);
		isScrolling = setTimeout(function() {
			scroll_times++;
		}, 200);
	}

	//add orientation change listener
	window.addEventListener('orientationchange', afterChange, false);
	function afterChange() {
		isOrientationChange = true;
		onWalk = raiseStair.infinite = false;
		div_content.removeEventListener('scroll', walkWithScroll, false);
		window.addEventListener('orientationchange', afterChange, false);
	}
}
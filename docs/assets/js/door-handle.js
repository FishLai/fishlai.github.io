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

	
}

window.addEventListener('load', function() {
	setDeviceRatio();
	let door_handleDoc = document.getElementById('door-handle').contentDocument;
	let svgImg = door_handleDoc.getElementById('layer1');
	svgImg.addEventListener('click', transformToResume, false);

	let DOM_door = document.getElementById('doorContainer');
	DOM_door.addEventListener('animationend', afterDoorAnimate, false);
});
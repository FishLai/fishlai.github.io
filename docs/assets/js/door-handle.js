function transformToResume() {
	//create door border
	let el_door_border = document.createElement("div");
	el_door_border.classList.add("door-border");
	//insert behind div#door
	let door = document.getElementById("door");
	door.insertAdjacentElement('afterend', el_door_border);

	//use transform semulate open door
	door.style.animation = "opendoor ease-in-out forwards 4s";

	//magnify main element to do walk in
	let DOM_main = document.getElementsByTagName('main')[0];
	DOM_main.style.animation = "walkin forwards 4s 2.5s";
};

function afterDoorAnimate() {
	// remove door border
	let el_door_border = document.getElementsByClassName('door-border');
	for(let i=0; i<el_door_border.length; i++){
		el_door_border[i].remove();
	};
	
	//remove opendoor animation
	let door = document.getElementById('door');
	door.style.animation = "";

	//remove walkin animation
	let DOM_main = document.getElementsByTagName('main')[0];
	DOM_main.style.animation = "";

	//hide my brief introduction card
	door.style.display = 'none';

	//DOM_section, resume fade in
	let DOM_resume = document.getElementById('svgContainer');
	DOM_resume.style.display = 'block';
	DOM_resume.style.opacity = 1;

	
}

window.addEventListener('load', function() {
	let door_handleDoc = document.getElementById('door-handle').contentDocument;
	let svgImg = door_handleDoc.getElementById('layer1');
	svgImg.addEventListener('click', transformToResume, false);

	let DOM_main = document.getElementsByTagName('main')[0];
	DOM_main.addEventListener('animationend', afterDoorAnimate, false);
});

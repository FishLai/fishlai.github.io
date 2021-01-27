function transformToResume() {
	let el_door_border = document.createElement("div");
	el_door_border.classList.add("door-border");
	let door = document.getElementById("door");
	door.insertAdjacentElement('afterend', el_door_border);

	door.style.animation = "opendoor ease-in-out forwards 4s";

	let dom_main = document.getElementsByTagName('main')[0];
	dom_main.style.animation = "walkin forwards 4s 2.5s";
};

function afterDoorAnimate() {
	let el_door_border = document.getElementsByClassName('door-border');
	for(let i=0; i<el_door_border.length; i++){
		el_door_border[i].remove();
	};
	
	let door = document.getElementById('door');
	door.style.animation = "";

	let DOM_main = document.getElementsByTagName('main')[0];
	DOM_main.style.animation = "";
}

window.addEventListener('load', function() {
	let door_handleDoc = document.getElementById('door-handle').contentDocument;
	let svgImg = door_handleDoc.getElementById('layer1');
	svgImg.addEventListener('click', transformToResume, false);

	let DOM_main = document.getElementsByTagName('main')[0];
	DOM_main.addEventListener('animationend', afterDoorAnimate, false);
});

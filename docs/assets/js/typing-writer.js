function typewriter(i, j, delay) {
	setTimeout(function(){
		line = split_text[j];
		word = line[i];
		cursor.insertAdjacentText('beforebegin', word);
		i++;
		if( i<line.length ) {
			typewriter(i, j, 50);
		} else {
			breakline = document.createElement('br');
			cursor.insertAdjacentElement('beforebegin', breakline);
			i = 0;
			j++;
			if( j<split_text.length ) {
				typewriter(i, j, 700);
			}
		}
	}, delay);
}

function typewriterinitial(el) {
	text = el.innerText;
	split_text = text.split('\n');
	el.innerHTML = '<span class="blink-cursor"></span>';
	selector_string = 'span.blink-cursor';
	cursor = document.querySelector(selector_string);
	typewriter(0, 0, 200);
}


var el = document.querySelector('p');
setTimeout(function(){ typewriterinitial(el)}, 2500);


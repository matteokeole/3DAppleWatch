const time = document.querySelector(".watch-time"),
date = document.querySelector(".watch-date"),
screen = document.querySelector(".screen"),
shade = document.querySelector(".shade"),
setDate = function() {
	// This sets the date and time on the watch object
	var D = new Date(),
	d = D.getDay(),
	n = D.getDate(),
	h = D.getHours(),
	m = D.getMinutes();
	switch (d) {
		case 1:
			d = "MON";
		break;
		case 2:
			d = "TUE";
		break;
		case 3:
			d = "WED";
		break;
		case 4:
			d = "THU";
		break;
		case 5:
			d = "FRI";
		break;
		case 6:
			d = "SAT";
		break;
		default:
			d = "SUN"
	}
	(h < 10) ? h = `0${h}` : h;
	(m < 10) ? m = `0${m}` : m;
	time.textContent = `${h}:${m}`;
	date.textContent = `${d} ${n}`
},
R = {
	x: 0,
	nowX: 0,
	onX: 0,
	oldX: 0
},
w2 = window.innerWidth / 2, // Window width / 2
h2 = window.innerHeight / 2, // Window height / 2
// Parameters
S = 2, // Sensitivity (higher number = lower sens)
P = 2, // Smooth motion (higher number = smoother motion)
// Mouse events
M = {
	down: function(e) {
		R.onX = -w2 + e.clientX;
		R.oldX = R.x;
		document.addEventListener("mousemove", M.move);
		document.addEventListener("touchmove", M.move)
	},
	move: function(e) {
		R.nowX = -w2 + e.clientX;
		R.x = ((R.nowX - R.onX) / S) + R.oldX;
		if (R.x < -60) R.x = -60;
		if (R.x > 60) R.x = 60;
		transform = `rotateY(${R.x.toFixed(P)}deg)`;
		// Object motion
		object.style["-webkit-transform"] = transform;
		object.style.transform = transform;
		// Shade rotation
		shade.style.width = `${(48 - (Math.abs(R.x) / 60) * 44)}mm`;
		shade.style.height = `${(48 - (Math.abs(R.x) / 60) * 4)}mm`;
		shade.style.right = `${((R.x + 60) / 60 * 100 - 100)}%`;
		shade.style.borderRadius = (R.x > 0) ? "20px 0 0 20px" : "0 20px 20px 0";
		shade.style.opacity = Math.abs(R.x / 60)
	},
	up: function() {
		document.removeEventListener("mousemove", M.move);
		document.removeEventListener("touchmove", M.move)
	}
},
object = document.querySelector(".object");

// Event listeners
addEventListener("mousedown", M.down);
addEventListener("mouseup", M.up);
addEventListener("touchstart", M.down);
addEventListener("touchend", M.up);

// Set time on watch
screen.style.color = "#777";
screen.style["-webkit-filter"] = "brightness(100%)";
screen.style.filter = "brightness(100%)";
setDate();
setInterval(setDate, 1000)
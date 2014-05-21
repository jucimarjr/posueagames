window.onload = function() {
	var m = document.createElement("canvas");
	var n = m.getContext("2d");
	m.width = 512;
	m.height = 434;
	document.getElementById('game').appendChild(m);
	var o = null, expected = 0, loaded = 0, gotLoad = function() {
		loaded++;
		if (loaded == expected && o)
			o()
	};
	var p = new Image();
	p.onload = gotLoad;
	expected++;
	p.src = "images/background.png";
	var q = new Image();
	q.onload = gotLoad;
	expected++;
	q.src = "images/copteranim5_13.png";
	var r = new Image();
	r.src = "images/explode.png";
	var s = new Image();
	s.src = "images/copteranim_inv.png";
	var t = new Image();
	t.onload = gotLoad;
	expected++;
	t.src = "images/block3.png";
	var u = new Image();
	u.onload = gotLoad;
	expected++;
	u.src = "images/powerup_inv.png";
	var v = new Image();
	v.onload = gotLoad;
	expected++;
	v.src = "images/smoke.png";
	var w = new Image();
	w.onload = gotLoad;
	expected++;
	w.src = "images/smoke2.png";
	var x = new Image();
	x.onload = gotLoad;
	expected++;
	x.src = "images/star.png";
	var y = new Image();
	y.onload = gotLoad;
	expected++;
	y.src = "images/star2.png";
	var z = 300;
	var A = {
		upgravity : 50,
		downgravity : 50,
		yvel : 0,
		x : 0,
		y : 0,
		w : 71,
		h : 44,
		current : 0
	};
	var B = {
		lastpuff : 0
	};
	var C = {
		speed : z,
		x : -100,
		y : -100,
		hit : 0,
		timer : 1000,
		collidesWith : function(a) {
			return (a.x <= (this.x + u.width) && this.x <= (a.x + A.w)
					&& a.y <= (this.y + u.height) && this.y <= (a.y + A.h))
		}
	};
	var D = {
		speed : z,
		x : 0,
		y : 0
	};
	var E = {
		speed : z,
		x : m.width,
		y : 0
	};
	var F = {
		speed : z,
		x : 0,
		tophgts : [ 5, 50, 35, 60, 15, 30, 10 ],
		bothgts : [ 50, 44, 55, 5, 50, 10, 55 ],
		shift : function() {
			this.tophgts.shift();
			this.tophgts.push(Math.random() * 60 + 10);
			this.bothgts.shift();
			this.bothgts.push(Math.random() * 60 + 10)
		},
		collidesWith : function(a) {
			var b = 4, bot_tol = 5;
			var c = (F.x + A.w / 2) / 128;
			if (c < 0) {
				c += 1;
				var d = this.tophgts[2];
				var e = this.tophgts[3]
			} else {
				var d = this.tophgts[1];
				var e = this.tophgts[2]
			}
			var f = e - c * (e - d) - b;
			if (f >= a.y)
				return true;
			var g = (F.x - A.w / 2) / 128;
			if (g < -1) {
				g += 1;
				var d = this.tophgts[3];
				var e = this.tophgts[4]
			} else {
				var d = this.tophgts[2];
				var e = this.tophgts[3]
			}
			var h = d + g * (d - e) - b;
			if (h >= a.y)
				return true;
			var c = (F.x + A.w / 2) / 128;
			if (c < 0) {
				c += 1;
				var i = this.bothgts[2];
				var j = this.bothgts[3]
			} else {
				var i = this.bothgts[1];
				var j = this.bothgts[2]
			}
			var k = j - c * (j - i) - bot_tol;
			if ((m.height - k) <= (a.y + A.h))
				return true;
			var g = (F.x - A.w / 2) / 128;
			if (g < -1) {
				g += 1;
				var i = this.bothgts[3];
				var j = this.bothgts[4]
			} else {
				var i = this.bothgts[2];
				var j = this.bothgts[3]
			}
			var l = i + g * (i - j) - bot_tol;
			if ((m.height - l) <= (a.y + A.h))
				return true;
			return false
		}
	};
	var G = null, dead = false, invincible = false, distance = 0;
	var H = {
		'-1' : true
	};
	addEventListener("keydown", function(e) {
		H[e.keyCode] = true
	}, false);
	addEventListener("keyup", function(e) {
		delete H[e.keyCode]
	}, false);
	addEventListener("mousedown", function(e) {
		H[-1] = true
	}, false);
	addEventListener("mouseup", function(e) {
		delete H[-1]
	}, false);
	addEventListener("touchstart", function(e) {
		H[-1] = true
	}, false);
	addEventListener("touchend", function(e) {
		delete H[-1]
	}, false);
	document.body.addEventListener('touchmove', function(e) {
		e.preventDefault()
	}, false);
	var I = function(d) {
		this.speed = z;
		this.x = m.width * (d ? 1.5 : 2) + 33;
		this.y = 32 + (Math.random() * (m.height - 78 * 2));
		this.reset = function() {
			this.x = m.width;
			this.y = 32 + (Math.random() * (m.height - 78 * 2));
			if (!invincible && Math.random() < 0.10 && C.x < 0) {
				C.x = m.width;
				C.y = this.y > m.height / 2 ? this.y - 40 : this.y + 78 + 20
			}
		};
		this.collidesWith = function(a) {
			var b = 12;
			var c = 4;
			return (a.x <= (this.x + t.width) && this.x <= (a.x + A.w - b)
					&& a.y <= (this.y + t.height) && this.y <= (a.y + A.h - c))
		}
	};
	var J = new I(), block2 = new I(true);
	var K = function() {
		A.x = m.width / 2 - 25;
		A.y = m.height / 2
	};
	var L = null, getScores = function() {
		if (typeof (Storage) !== "undefined" && !L) {
			L = localStorage.highscores.split(';');
			for (var i = 0; i < L.length; i++)
				L[i] = L[i].split(',')
		}
	};
	var M = function() {
		getScores();
		for (var i = 0; i < L.length; i++) {
			if (L[i][0] > 0) {
				var d = new Date();
				d.setTime(L[i][1]);
				var a = d.getDate(), month = d.getMonth() + 1, year = d
						.getFullYear();
				document.getElementById("score_" + i).innerHTML = L[i][0]
						+ ' (' + month + '/' + a + '/' + year + ')'
			}
		}
	};
	var N = function() {
		if (typeof (Storage) !== "undefined") {
			var a = [];
			for (var i = 0; i < L.length; i++)
				a.push(L[i].join(','));
			localStorage.highscores = a.join(';');
			M()
		}
	};
	var O = function() {
		dead = true;
		if (typeof (Storage) !== "undefined") {
			var a = parseInt(distance.toFixed(0), 10);
			if (a > L[0][0]) {
				L[2] = L[1];
				L[1] = L[0];
				L[0] = [ a, +new Date() ];
				N()
			} else if (a > L[1][0]) {
				L[2] = L[1];
				L[1] = [ a, +new Date() ];
				N()
			} else if (a > L[2][0]) {
				L[2] = [ a, +new Date() ];
				N()
			}
		}
		clearInterval(G);
		setTimeout(function() {
			window.ontouchend = window.onclick = function() {
				location.reload()
			}
		}, 500)
	};
	var P = [];
	var Q = function(a) {
		A.y += A.yvel * a;
		var b = 2000, power = 1500, accel_time = 0.15;
		if (-1 in H) {
			if (A.yvel > -(power * accel_time))
				A.yvel -= power * a
		} else {
			if (A.yvel < (b * accel_time))
				A.yvel += b * a
		}
		A.current += a;
		if (A.current > 2)
			A.current = 0;
		else
			A.current += a;
		J.x -= J.speed * a;
		block2.x -= block2.speed * a;
		C.x -= C.speed * a;
		distance += (block2.speed * a) / 100;
		if (B.lastpuff > 0.05) {
			B.lastpuff = 0;
			P.push([ distance, A.y, B.alt ]);
			B.alt = Math.floor(Math.random() * 2)
		} else
			B.lastpuff += a;
		if (F.x - F.speed * a <= -128) {
			F.x = 0;
			F.shift()
		} else
			F.x -= F.speed * a;
		if (D.x - D.speed * a <= -m.width)
			D.x = m.width;
		else
			D.x -= D.speed * a;
		if (E.x - E.speed * a <= -m.width)
			E.x = m.width;
		else
			E.x -= E.speed * a;
		if (J.x <= -33)
			J.reset();
		if (block2.x <= -33)
			block2.reset();
		if (C.collidesWith(A)) {
			invincible = true;
			setTimeout(function() {
				invincible = false
			}, 5000)
		}
		if ((J.collidesWith(A) || block2.collidesWith(A)) && !invincible) {
			O()
		}
		if (F.collidesWith(A) && !invincible) {
			O()
		}
	};
	var R = function() {
		n.drawImage(p, D.x, 0);
		n.drawImage(p, E.x, 0);
		n.beginPath();
		n.moveTo(A.x, A.y + 20);
		for (var i = P.length - 1; i >= 0; i--) {
			n.drawImage(invincible ? ((P[i][2] == 0) ? x : y)
					: ((P[i][2] == 0) ? v : w), A.x - 100
					* (distance - P[i][0]), P[i][1] + 20)
		}
		n.strokeStyle = '#ff0';
		n.lineWidth = 1;
		n.stroke();
		n.drawImage(t, J.x, J.y);
		n.drawImage(t, block2.x, block2.y);
		if (!invincible)
			n.drawImage(u, C.x, C.y);
		n.beginPath();
		n.moveTo(F.x, 0);
		n.lineTo(F.x, F.tophgts[0]);
		n.lineTo(F.x + 128, F.tophgts[1]);
		n.lineTo(F.x + 256, F.tophgts[2]);
		n.lineTo(F.x + 384, F.tophgts[3]);
		n.lineTo(F.x + 512, F.tophgts[4]);
		n.lineTo(F.x + 640, F.tophgts[5]);
		n.lineTo(F.x + 768, F.tophgts[6]);
		n.lineTo(F.x + 768, 0);
		n.fillStyle = '#433628';
		n.fill();
		n.strokeStyle = '#b98d65';
		n.lineWidth = 3;
		n.stroke();
		n.beginPath();
		n.moveTo(F.x, m.height);
		n.lineTo(F.x, m.height - F.bothgts[0]);
		n.lineTo(F.x + 128, m.height - F.bothgts[1]);
		n.lineTo(F.x + 256, m.height - F.bothgts[2]);
		n.lineTo(F.x + 384, m.height - F.bothgts[3]);
		n.lineTo(F.x + 512, m.height - F.bothgts[4]);
		n.lineTo(F.x + 640, m.height - F.bothgts[5]);
		n.lineTo(F.x + 768, m.height - F.bothgts[6]);
		n.lineTo(F.x + 768, m.height);
		n.fillStyle = '#433628';
		n.fill();
		n.strokeStyle = '#b98d65';
		n.lineWidth = 3;
		n.stroke();
		if (typeof (global_ceiling) != 'undefined') {
			n.beginPath();
			n.arc(A.x, m.height - global_ceiling, 5, 0, 2 * Math.PI, true);
			n.fillStyle = '#f00';
			n.fill();
			n.beginPath();
			n.arc(A.x + A.w, m.height - global_ceiling_right, 5, 0,
					2 * Math.PI, true);
			n.fillStyle = '#f00';
			n.fill()
		}
		if (dead)
			n.drawImage(r, A.x, A.y);
		else
			n.drawImage(invincible ? s : q, (1 - Math.floor(A.current * 4) % 2)
					* A.w, (-1 in H) ? A.h : 0, A.w, A.h, A.x, A.y, A.w, A.h);
		if (dead) {
			n.fillStyle = "rgb(250, 250, 250)";
			n.font = "24px Helvetica";
			n.textAlign = "center";
			n.textBaseline = "top";
			n.fillText("Game Over", (m.width + A.w - 45) / 2,
					A.y > m.height / 2 ? A.y - 30 : A.y + 50)
		}
		n.fillStyle = "rgb(250, 250, 250)";
		n.font = "24px Helvetica";
		n.textAlign = "left";
		n.textBaseline = "top";
		n.fillText("Distance = " + distance.toFixed(0), 32, 32)
	};
	var S, play = function() {
		var a = Date.now();
		var b = a - S;
		Q(b / 1000);
		R(dead);
		S = a
	};
	o = function() {
		K();
		Q(0);
		R();
		window.ontouchstart = window.onmousedown = function() {
			if (!G) {
				S = Date.now();
				G = setInterval(play, 1)
			}
			window.ontouchstart = window.onmousedown = null
		}
	};
	if (!localStorage.highscores)
		localStorage.highscores = '0,0;0,0;0,0';
	M()
}

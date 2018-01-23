var topics = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "`", "-", "=", "[", "]", "\\", ";", "'", ",", ".", "/"];
var topics2 = [];
var status = null;
var number = 0;

function showGame() {
	$("#menu").hide();
	$("#playing").show();
}


function setQues() {
	topics2 = [];
	for (; topics2.length < topics.length;) {
		var maxNum = topics.length - 1;
		var minNum = 0;
		var n = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
		var c = true;
		for (var l = 0; l < topics2.length; l++) {
			if (topics2[l] == topics[n]) {
				c = false;
			}
		}
		if (c) {
			topics2.push(topics[n]);
		}
	}
	console.log(topics2);
}


function reciprocalon() {
	status = "倒數";
	$("#answer").val("");

	var time = 60;

	var reciprocal = setInterval(function (reciprocal) {
		if (time <= 0) {
			stopReciprocal(reciprocal);
		} else {
			var ti = ((Math.round(time * 1000) / 1000) + "");

			if (ti.length < 5) {
				if ((Math.round(time * 1000) / 1000) < 10) {
					ti = "0" + ti;
					for (; 5 > ti.length;) {
						ti = ti + "0";
					}
				} else {
					for (; 5 > ti.length;) {
						ti = ti + "0";
					}
				}
			}


			$("#second").text(ti);
			time -= 0.01;

		}
	}, 1);
}


function stopReciprocal(reciprocal) {
	clearInterval(reciprocal);
	clearInterval(control);
	$("#second").text("00.00");
	menu();
	status = "結束";
}

var control;
function playing() {
	showGame();

	var p = 0;
	control = setInterval(function () {
		$("input").focus();
		if ($("#answer").val() != "" && status == "等待") {
			if ($("#answer").val() == " ") {
				reciprocalon();
				number = 0;
			} else {
				$("#answer").val("");
			}
		}
		if (status == "倒數") {
			$("#topic").css("font-size", 90);
			if (p == topics2.length || topics2 == 0) {
				setQues();
				p = 0;
			}
			$("#topic").text(topics2[p]);
			if ($("#answer").val() != "") {
				if ($("#answer").val() == topics2[p]) {
					number++;
					p++;
				}
				$("#answer").val("");
			}
		}
	}, 1);

	$("#answer").val("");
	$("#topic").css("font-size", 70);
	$("#topic").text("按下空白鍵開始");
	status = "等待";

}


function showMenu() {
	$("#playing").hide();
	$("#menu").show();
	$("#num").text(number);
}




function menu() {
	showMenu();
	$(".button").mouseup(playing());
}






playing();

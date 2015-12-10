(function() {
$(".dixaba-statistics").remove();
var s = document.createElement('div');
s.className = "dixaba-statistics";
var win = $(".game-summary-victory").length;
var lose = $(".game-summary-defeat").length;
s.innerHTML = "<div style='z-index: 1000; display: block; font-size: 20px; color: #660000; background-color: #ffffff; margin: 35px; padding: 5px; position: fixed; border: #000000; border-radius: 5px; border-style: solid'><b>"+(win+lose)+" игр<br>"+win+" побед<br>"+lose+" поражений<br>Винрейт: "+(win/(win+lose)*100).toPrecision(4)+"%</b></div>";
document.body.insertBefore(s, document.body.firstChild);
}).call(this);

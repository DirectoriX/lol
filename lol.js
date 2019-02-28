(function () {

    function addLeadZeroes(value) {
        if (value < 10)
            value = "0" + value;
        return value;
    }
    if ($(".dixaba-statistics").length !== 0) {
        $(".dixaba-statistics").remove();
    }
    else {
        $("head").append($("<link rel='stylesheet' href='https://dixaba.github.io/lol/dixaba-styles.css' type='text/css' />"));
    }
    if ($(".game-summary").length !== 0) { // История игр
        var s = document.createElement('div');
        s.className = "dixaba-statistics";
        var win = $(".game-summary-victory").length;
        var lose = $(".game-summary-defeat").length;
        var total = win + lose;
        var winrate = (win / (win + lose) * 100).toFixed(2);
        var time = "";
        var avgtime = "";
        var hours = 0;
        var minutes = 0;
        var seconds = 0;
        var allseconds = 0;
        var divstrl = "<div class='dixaba-strl' onclick='$(\".dixaba\").toggle();'><b>";
        var divclose = "<div class='dixaba-close' onclick='$(\".dixaba-statistics\").remove();'></div>";
        var divstrr = "</b></div>";
        $.each($(".date-duration-duration").children(".binding"), function (i, elem) {
            var aa = new String($(this).text());
            var vals = aa.split(":");
            if (vals.length === 2) {
                allseconds += vals[0] * 60;
                allseconds += vals[1] - 0;
            } else {
                allseconds += vals[0] * 3600;
                allseconds += vals[1] * 60;
                allseconds += vals[2] - 0;
            }
        });
        minutes = allseconds / 60;
        hours = minutes / 60;
        seconds = parseInt(allseconds % 60);
        minutes = parseInt(minutes % 60);
        hours = parseInt(hours);
        time = hours + ":" + addLeadZeroes(minutes) + ":" + addLeadZeroes(seconds);
        allseconds /= total;
        minutes = allseconds / 60;
        hours = minutes / 60;
        seconds = parseInt(allseconds % 60);
        minutes = parseInt(minutes % 60);
        hours = parseInt(hours);
        avgtime = hours + ":" + addLeadZeroes(minutes) + ":" + addLeadZeroes(seconds);
        var allk = 0;
        var alld = 0;
        var alla = 0;
        $.each($(".kda-plate-kda"), function (i, elem) {
            var aa = new String($(this).text());
            var vals = aa.split("/");
            allk += vals[0] - 0;
            alld += vals[1] - 0;
            alla += vals[2] - 0;
        });
        var kda = (allk / total).toFixed(1) + "/";
        kda += (alld / total).toFixed(1) + "/";
        kda += (alla / total).toFixed(1) + " = ";
        kda += ((alla + allk) / alld).toFixed(1);
        var allminions = 0;
        $.each($(".income-minions"), function (i, elem) {
            var thisminions = $(this).text();
            allminions += thisminions - 0;
        });
        var minions = (allminions / total).toFixed(1);
        var allgold = 0;
        $.each($(".income-gold"), function (i, elem) {
            var thisgold = parseFloat($(this).text());
            allgold += thisgold;
        });
        var gold = (allgold / total).toFixed(2) + 'k';
        function addition() {
            return  "<br>Суммарное время игр - " + time + "<br>Среднее время игры - " + avgtime + "<br>Средний KDA - " + kda + "<br>Среднее количество миньонов - " + minions + "<br>Среднее количество золота - " + gold;
        }
        function basic() {
            return "Всего игр - " + total + "<br>Побед - " + win + "<br>Поражений - " + lose + "<br>Винрейт - " + winrate + "%";
        }

        s.innerHTML = "<div class='dixaba'>" + divstrl + divclose + basic() + divstrr + "</div>" + "<div class='dixaba' style='display: none'>" + divstrl + divclose + basic() + addition() + divstrr + "</div>";
        document.body.insertBefore(s, document.body.firstChild);
    }
    else {
        if ($(".game-grid").length !== 0) { // Подробная информация об игре
            var tbl = $($(".table-bordered")[0]).children()[0];

            // Иконки чемпионов
            {
                var row = $(tbl).children()[0];
                var td1 = document.createElement('td');
                td1.className = "team-100 dixaba-statistics";
                td1.innerHTML = "<div class='dixaba-div'><b>Синяя</b><div class='team-marker'></div></div>";
                var td2 = document.createElement('td');
                td2.className = "team-200 dixaba-statistics ";
                td2.innerHTML = "<div class='dixaba-div'><b>Красная</b><div class='team-marker'></div></div>";
                $(td1).insertAfter($(row).children()[5]);
                $(td2).insertAfter($(row).children()[6]);
            }

            // УСС
            {
                row = $(tbl).children()[2];
                var allk = 0;
                var alld = 0;
                var alla = 0;
                for (var i = 1; i < 6; i++) {
                    var aa = new String($($(row).children()[i]).text());
                    var vals = aa.split("/");
                    allk += vals[0] - 0;
                    alld += vals[1] - 0;
                    alla += vals[2] - 0;
                }
                td1 = document.createElement('td');
                td1.className = "team-100 dixaba-statistics";
                td1.innerHTML = "<div class='dixaba-div'>" + allk + "/" + alld + "/" + alla + "</div>";
                $(td1).insertAfter($(row).children()[5]);
                allk = 0;
                alld = 0;
                alla = 0;
                for (var i = 7; i < 12; i++) {
                    var aa = new String($($(row).children()[i]).text());
                    var vals = aa.split("/");
                    allk += vals[0] - 0;
                    alld += vals[1] - 0;
                    alla += vals[2] - 0;
                }
                td2 = document.createElement('td');
                td2.className = "team-200 dixaba-statistics ";
                td2.innerHTML = "<div class='dixaba-div'>" + allk + "/" + alld + "/" + alla + "</div>";
                $(td2).insertAfter($(row).children()[6]);
            }

            // Лучшее что-то там
            {
                [3, 4, 15].forEach(function (item, index, array) {
                    var r = item;
                    var row = $(tbl).children()[r];
                    var best = 0;
                    for (var i = 1; i < 6; i++) {
                        var aa = new String($($(row).children()[i]).text());
                        if ((aa - 0) > best) {
                            best = aa - 0;
                        }
                    }
                    var td1 = document.createElement('td');
                    td1.className = "team-100 dixaba-statistics";
                    td1.innerHTML = "<div class='dixaba-div'>" + best + "</div>";
                    $(td1).insertAfter($(row).children()[5]);
                    best = 0;
                    for (var i = 7; i < 12; i++) {
                        var aa = new String($($(row).children()[i]).text());
                        if ((aa - 0) > best) {
                            best = (aa - 0);
                        }
                    }
                    var td2 = document.createElement('td');
                    td2.className = "team-200 dixaba-statistics ";
                    td2.innerHTML = "<div class='dixaba-div'>" + best + "</div>";
                    $(td2).insertAfter($(row).children()[6]);
                });
            }

            // Первая кровь
            {
                row = $(tbl).children()[5];
                var bluefb = false;
                for (var i = 1; i < 5; i++) {
                    var aa = new String($($(row).children()[i]).text());
                    if (aa == "●") {
                        bluefb = true;
                    }
                }
                td1 = document.createElement('td');
                td1.className = "team-100 dixaba-statistics";
                td1.innerHTML = "<div class='dixaba-div'>" + (bluefb ? "●" : "○") + "</div>";
                $(td1).insertAfter($(row).children()[5]);
                var redfb = false;
                for (var i = 7; i < 12; i++) {
                    var aa = new String($($(row).children()[i]).text());
                    if (aa == "●") {
                        redfb = true;
                    }
                }
                td2 = document.createElement('td');
                td2.className = "team-200 dixaba-statistics ";
                td2.innerHTML = "<div class='dixaba-div'>" + (redfb ? "●" : "○") + "</div>";
                $(td2).insertAfter($(row).children()[6]);
            }

            // Суммарные показатели
            {
                for (var r = 7; r < 36; r++) {
                    var skip = [15, 18, 24, 29];
                    function aba(element, index, array) {
                        return (element === r);
                    }
                    if (skip.find(aba)) {
                      continue;
                    }
                    row = $(tbl).children()[r];
                    var notkilo = [25, 26, 27, 28, 32, 33, 34, 35];
                    var res;
                    var summa = 0;
                    for (var i = 1; i < 6; i++) {
                        var aa = new String($($(row).children()[i]).text());
                        if (notkilo.find(aba)) {
                            summa += (aa == "-") ? 0 : (aa - 0);
                        } else {
                            var vals = aa.split(" ");
                            summa += vals[0] - 0;
                        }
                    }
                    if (notkilo.find(aba)) {
                        res = summa;
                    } else {
                        res = summa.toFixed(1) + " тыс.";
                    }
                    td1 = document.createElement('td');
                    td1.className = "team-100 dixaba-statistics";
                    td1.innerHTML = "<div class='dixaba-div'>" + res + "</div>";
                    $(td1).insertAfter($(row).children()[5]);
                    summa = 0;
                    for (var i = 7; i < 12; i++) {
                        var aa = new String($($(row).children()[i]).text());
                        if (notkilo.find(aba)) {
                            summa += (aa == "-") ? 0 : (aa - 0);
                        } else {
                            var vals = aa.split(" ");
                            summa += vals[0] - 0;
                        }
                    }
                    if (notkilo.find(aba)) {
                        res = summa;
                    } else {
                        res = summa.toFixed(1) + " тыс.";
                    }
                    td2 = document.createElement('td');
                    td2.className = "team-200 dixaba-statistics ";
                    td2.innerHTML = "<div class='dixaba-div'>" + res + "</div>";
                    $(td2).insertAfter($(row).children()[6]);
                }
            }
        }
        else {
            alert("Не найдено необходимой информации! Не та страница?");
        }
    }
}).call(this);

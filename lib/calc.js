//-------------------------------------------------------------------------------------------------------
// Vig's AE Battle Calc ï¿½ 2010
// Written By Dean, aka Vig
// Website: http://vig.vg
// This script is free to be used and distributed by whoever wishes to use it
// You must keep this origional comment block at the top of the script
//-------------------------------------------------------------------------------------------------------
var shipTypes = [
        [5, 1, 2, 2, 0],
        [10, 2, 4, 2, 0],
        [30, 3, 10, 4, 0],
        [60, 5, 12, 4, 1],
        [20, 1, 4, 4, 0],
        [30, 1, 2, 2, 0],
        [40, 3, 8, 8, 0],
        [80, 2, 12, 12, 0],
        [120, 5, 14, 12, 1],
        [40, 1, 1, 2, 0],
        [100, 1, 2, 4, 0],
        [200, 3, 24, 24, 2],
        [400, 2, 12, 24, 2],
        [500, 3, 48, 48, 4],
        [2E3, 5, 168, 128, 10],
        [2500, 5, 64, 96, 8],
        [1E4, 6, 756, 512, 20],
        [5E4, 7, 3402, 2048, 30],
        [2E5, 6, 1E4, 6600, 40],
        [5E5, 7, 25500, 13500, 60],
        [0, 1, 4, 4, 0],
        [0, 1, 8, 8, 0],
        [0, 2, 16, 16, 0],
        [0, 3, 24, 24, 0],
        [0, 5, 32, 32, 2],
        [0, 6, 64, 64, 6],
        [0, 7, 256, 256, 8],
        [0, 5, 2, 512, 16],
        [0, 5, 4, 2048, 20],
        [0, 6, 2048, 1024, 12]
    ],
    techNames = [];
techNames[0] = "Arm";
techNames[1] = "Las";
techNames[2] = "Mis";
techNames[3] = "Pla";
techNames[4] = "Sld";
techNames[5] = "Ion";
techNames[6] = "Pho";
techNames[7] = "Dis";
var shipNames = [];
shipNames.FT = 0;
shipNames.BO = 1;
shipNames.HB = 2;
shipNames.IB = 3;
shipNames.CV = 4;
shipNames.RC = 5;
shipNames.DE = 6;
shipNames.FR = 7;
shipNames.IF = 8;
shipNames.SS = 9;
shipNames.OS = 10;
shipNames.CR = 11;
shipNames.CA = 12;
shipNames.HC = 13;
shipNames.BS = 14;
shipNames.FC = 15;
shipNames.DN = 16;
shipNames.TI = 17;
shipNames.LE = 18;
shipNames.DS = 19;
shipNames.BA = 20;
shipNames.LT = 21;
shipNames.MT = 22;
shipNames.PT = 23;
shipNames.IT = 24;
shipNames.OT = 25;
shipNames.DT = 26;
shipNames.FS = 27;
shipNames.PS = 28;
shipNames.PR = 29;
var attackFleet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    defendingFleet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    aResultFleet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dResultFleet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    result = [0, 0, 0];

function calcInit() {
    if(typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        var ids=["attArm","attLas","attMis","attPla","attSld","attIon","attPho","attDis","attCCs","attDfC","attTaC","attLevel"];
        ids.forEach(function(thing){
            $(thing).value=localStorage.getItem(thing);
            calcTech($(thing));
        });
    } 
    for (var a in shipNames) {
        var b = $("a" + a + "p"),
            c = $("a" + a + "a"),
            d = $("a" + a + "s"),
            f = $("d" + a + "p"),
            e = $("d" + a + "a"),
            g = $("d" + a + "s"),
            j = shipTypes[shipNames[a]][2],
            l = shipTypes[shipNames[a]][3],
            h = shipTypes[shipNames[a]][4];
        if (h == 0) h = "-";
        b.innerHTML = j;
        f.innerHTML = j;
        c.innerHTML = l;
        e.innerHTML = l;
        d.innerHTML = h;
        g.innerHTML = h
    }
}

function setTech(a, b) {
    for (var c = b.split(","), d = 0; d < c.length; d++) {
        var f = c[d].split(":");
        if (f.length == 2) {
            var e = f[0];
            f = parseFloat(f[1]);
            if ($(a + e)) {
                $(a + e).value = f;
                e == "DfC" || e == "TaC" ? calcTech($(a + e), 1) : calcTech($(a + e), 5)
            }
        }
    }
}

function resetTech(a) {
    subSide = a.substring(0, 1);
    for (var b in techNames) {
        $(a + techNames[b]).value = 0;
        calcTech($(a + techNames[b]), -1)
    }
    applyTechToUnits(subSide)
}

function calcTech(a, b) {
    if(typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        localStorage.setItem(a.id,a.value); 
    } 
    var c = a.id.substring(3),
        d = a.id.substring(0, 1);
    if (c = $(d + c)) {
        var f = 0;
        a.value = a.value.trim();
        if (IsNumeric(a.value)) {
            b || (b = 5);
            f = b * a.value;
            c.innerHTML = f;
            if (f > 0) {
                c.className = "bonus highlightBonus";
                c.parentNode.style.backgroundColor = "#ABCBEA"
            } else {
                c.className = "bonus";
                c.parentNode.style.backgroundColor = "#CBDDEF"
            }
        } else {
            a.value = 0;
            c.innerHTML = 0;
            c.className = "bonus";
            c.parentNode.style.backgroundColor = "#CBDDEF"
        }
        b != -1 && applyTechToUnits(d)
    }
}

function applyTechToUnits(a) {
    var b = "att";
    if (a == "d") b = "def";
    var c = 1;
    if ($(b + "DS").value != 0) c = 1.1;
    else if ($(b + "LE").value != 0) c = 1.05;
    b = 1 + parseInt($(a + "CCs").innerHTML, 10) * 0.01;
    var d = parseInt($(a + "DfC").innerHTML, 10),
        f = parseInt($(a + "TaC").innerHTML, 10),
        e;
    for (e in shipNames) {
        var g = $(a + e + "p"),
            j = $(a + e + "a"),
            l = $(a + e + "s"),
            h = shipTypes[shipNames[e]][2],
            o = shipTypes[shipNames[e]][3],
            i = shipTypes[shipNames[e]][4],
            m = parseInt($(a + techNames[shipTypes[shipNames[e]][1]]).innerHTML, 10),
            k = parseInt($(a + techNames[0]).innerHTML, 10),
            q = parseInt($(a + techNames[4]).innerHTML, 10),
            n = 0;
        if (shipNames[e] < 20) n = 0;
        else {
            n = d;
            b = 1;
            f = 0
        }
        g.innerHTML = roundNumber(h * c * (1 + (n + f + m) * 0.01) * b, 1);
        j.innerHTML = roundNumber(o * c * (1 + (n + k) * 0.01), 1);
        if (i > 0) l.innerHTML = roundNumber(i * ((q + 100) / 100), 1)
    }
    fight()
}

function setUnits(a, b) {
    for (var c = b.split(","), d = 0; d < c.length; d++) {
        var f = c[d].split(":");
        if (f.length == 2) {
            var e = f[0];
            f = parseFloat(f[1]);
            if ($(a + e)) {
                $(a + e).value = f;
                unitValueUpdate($(a + e), 1)
            }
        }
    }
    fight()
}

function unitValueUpdate(a, b) {
    var c = a.id.substring(3),
        d = a.id.substring(0, 1);
    a.value = a.value.trim();
    if (!IsNumeric(a.value)) a.value = 0;
    a.parentNode.parentNode.style.backgroundColor = a.value > 0 ? "#A7CCCC" : "#B5B5B5";
    if (d == "a") attackFleet[shipNames[c]] = a.value;
    else if (d == "d") defendingFleet[shipNames[c]] = a.value;
    if (c == "LE" || c == "DS") applyTechToUnits(d);
    b || fight()
}

function resetUnits(a) {
    subSide = a.substring(0, 1);
    for (var b in shipNames) {
        $(a + b).value = 0;
        unitValueUpdate($(a + b), 1)
    }
    fight()
}

function fight() {
    result[0] = 0;
    result[1] = 0;
    result[2] = 0;
    dResultFleet = attackOneWay("a");
    aResultFleet = attackOneWay("d");
    for (var a in shipNames)
        if (shipNames[a] < 20) {
            aResultFleet[shipNames[a]] = roundUp(aResultFleet[shipNames[a]], findScale(a));
            dResultFleet[shipNames[a]] = roundUp(dResultFleet[shipNames[a]], findScale(a))
        }
    equalizeTurret();
    updateResults();
    printBR()
}

function equalizeTurret() {
    for (var a = 0, b = 0, c = 0, d = 0, f = ["BA", "LT", "MT", "PT", "IT", "OT", "DT", "FS", "PS", "PR"], e = [5, 10, 20, 100, 256, 1024, 4096, 4096, 25E3, 5E4], g = 0; g < f.length; g++) {
        var j = attackFleet[shipNames[f[g]]],
            l = aResultFleet[shipNames[f[g]]],
            h = j / 5 * e[g];
        a += h;
        var o = 0;
        if (j > 0) o = l / j;
        b += h * o;
        j = defendingFleet[shipNames[f[g]]];
        l = dResultFleet[shipNames[f[g]]];
        h = j / 5 * e[g];
        c += h;
        o = 0;
        if (j > 0) o = l / j;
        d += h * o
    }
    a = b / a;
    if (isNaN(a)) a = 0;
    c = d / c;
    if (isNaN(c)) c = 0;
    for (g = 0; g < f.length; g++) {
        aResultFleet[shipNames[f[g]]] = roundUp(attackFleet[shipNames[f[g]]] * a, 2);
        dResultFleet[shipNames[f[g]]] = roundUp(defendingFleet[shipNames[f[g]]] * c, 2)
    }
}

function calcDamagePerUnit(a, b, c) {
    var d = 0;
    return d = a > b ? a - b + b * c : a * c
}

function findScale(a) {
    return shipNames[a] < 11 ? 0 : shipNames[a] > 10 && shipNames[a] < 14 ? 1 : 2
}

function attackOneWay(a) {
    var b = attackFleet.slice(),
        c = defendingFleet.slice(),
        d = "d";
    if (a == "d") {
        b = defendingFleet.slice();
        c = attackFleet.slice();
        d = "a"
    }
    for (var f in shipNames)
        if (b[shipNames[f]] != 0) {
            var e = b[shipNames[f]],
                g = parseFloat($(a + f + "p").innerHTML),
                j = false;
            if (shipNames[f] > 19) j = true;
            var l = 0.01;
            if (shipNames[f] == 3 || shipNames[f] == 8) l = 0.5;
            for (; e > 1.0E-4;) {
                var h = 0,
                    o = 0,
                    i;
                for (i in shipNames)
                    if (c[shipNames[i]] != 0) {
                        var m = c[shipNames[i]],
                            k = parseFloat($(d + i + "s").innerHTML);
                        if (isNaN(k)) k = 0;
                        o += calcDamagePerUnit(g, k, l);
                        h++
                    }
                if (h <= 0) break;
                var q = 0;
                for (i in shipNames)
                    if (c[shipNames[i]] != 0) {
                        m = c[shipNames[i]];
                        var n = false;
                        if (shipNames[i] > 19) n = true;
                        var p = parseFloat($(d + i + "a").innerHTML),
                            r = m * p;
                        k = parseFloat($(d + i + "s").innerHTML);
                        if (isNaN(k)) k = 0;
                        k = calcDamagePerUnit(g, k, l);
                        var s = e * k / o;
                        if (j) s = e / h;
                        var u = s * k;
                        p = (r - u) / p;
                        if (p < 0) p = 0;
                        if (u > r) {
                            p = 0;
                            q += r / k
                        } else q += s;
                        c[shipNames[i]] = p;
                        if (!n) {
                            (n = shipTypes[shipNames[i]][0]) || (n = 1);
                            m = roundUp(m - Math.ceil(p), findScale(i));
                            if (m > 0) {
                                m = Math.ceil(m);
                                var t;
                                if (d == "a") {
                                    result[0] += m * n;
                                    t = parseInt($("attArm").value, 10)
                                } else if (d == "d") {
                                    result[1] += m * n;
                                    t = parseInt($("defArm").value, 10)
                                }
                                result[2] += Math.floor(m * n * (Math.floor(2 * t) / 100))
                            }
                        }
                    }
                e -= q
            }
        }
    return c
}

function updateResults() {
    for (var a in shipNames) {
        var b = $("a" + a + "r");
        if (attackFleet[shipNames[a]] > aResultFleet[shipNames[a]]) {
            b.innerHTML = aResultFleet[shipNames[a]];
            b.className = aResultFleet[shipNames[a]] == 0 ? "result lostAll" : "result loss"
        } else if (attackFleet[shipNames[a]] != 0) {
            b.innerHTML = aResultFleet[shipNames[a]];
            b.className = "result noLoss"
        } else {
            b.innerHTML = "-";
            b.className = "result"
        }
        b = $("d" + a + "r");
        if (defendingFleet[shipNames[a]] > dResultFleet[shipNames[a]]) {
            b.innerHTML = dResultFleet[shipNames[a]];
            b.className = dResultFleet[shipNames[a]] == 0 ? "result lostAll" : "result loss"
        } else if (defendingFleet[shipNames[a]] != 0) {
            b.innerHTML = dResultFleet[shipNames[a]];
            b.className = "result noLoss"
        } else {
            b.innerHTML = "-";
            b.className = "result"
        }
    }
}

function printBR() {
    var a = $("unitRes"),
        b = $("derbRes"),
        c = $("profitRes"),
        d = $("pillRes"),
        f = $("xpRes"),
        e = $("attLevel").value,
        g = $("defLevel").value;
    e = IsNumeric(e) ? parseFloat(e) : 0;
    $("attLevel").value = e;
    g = IsNumeric(g) ? parseFloat(g) : 0;
    $("defLevel").value = g;
    e = calcXP(e, g, result[0] + result[1]);
    a.innerHTML = "Total cost of unist destroyed: " + (result[0] + result[1]) + " ( Attacker: " + result[0] + " ; Defender: " + result[1] + " ) ";
    f.innerHTML = "<small>Estimated Experience: ( Attacker: +" + e[0] + " ; Defender: +" + e[1] + " )</small>";
    b.innerHTML = "Estimated debris in space: " + result[2];
    a = parseInt($("brResPill").innerHTML.replace(/,/gi, ""), 10);
    d.innerHTML = a > 0 ? "Estimated base pillage: " + a : "";
    c.innerHTML = "Estimated attacker profit: " + (result[2] - result[0] + a);
    addResultLink()
}

function addResultLink() {
    return;
    for (var a = $("resLink"), b = "aT=", c = "aS=", d = "dT=", f = "dS=", e = 0; e < techNames.length; e++) {
        var g = $("att" + techNames[e]).value;
        if (g > 0) {
            if (b != "aT=") b += ",";
            b += techNames[e] + ":" + g
        }
        g = $("def" + techNames[e]).value;
        if (g > 0) {
            if (d != "dT=") d += ",";
            d += techNames[e] + ":" + g
        }
    }
    for (e in shipNames) {
        g = $("a" + e + "r").innerHTML;
        if (g > 0) {
            if (c != "aS=") c += ",";
            c += e + ":" + g
        }
        g = $("d" + e + "r").innerHTML;
        if (g > 0) {
            if (f != "dS=") f += ",";
            f += e + ":" + g
        }
    }
    a.href = "http://vig.vg/AE/aeBattleCalc.php?" + b + "&" + c + "&" + d + "&" + f
}

function calcXP(a, b, c) {
    var d = [0, 0];
    if (a == 0) a = 1;
    if (b == 0) b = 1;
    if (a > b) {
        d[0] = Math.round(Math.pow(b / a, 2) / 20 * c);
        a = a / b / 20;
        if (a > 0.1) a = 0.1;
        d[1] = Math.round(a * c)
    } else {
        d[1] = Math.round(Math.pow(a / b, 2) / 20 * c);
        a = b / a / 20;
        if (a > 0.1) a = 0.1;
        d[0] = Math.round(a * c)
    }
    return d
}

function pillageInit() {
    document.writeln("<center><table class='pillageTable'><tr><th>Base Economy</th><th>Base Income</th><th>Attacker Level</th><th>Defender Level</th></tr><tr><td><input type='text' id='bEcon' size='9' maxlength='9' value='0' onchange='doPillageCalc(this);' /></td><td><input type='text' id='bIncome' size='9' maxlength='9' value='0' onchange='doPillageCalc(this);' /></td><td><input type='text' id='attLevel' size='9' maxlength='9' value='1' onchange='doPillageCalc(this);' /></td><td><input type='text' id='defLevel' size='9' maxlength='9' value='1' onchange='doPillageCalc(this);' /></td></tr></table><br/><br/><span class='subHeading'>Results</span><table class='pillageTable' rules='rows'><tr><th>Min. Pillage</th><th>Eco Lost Per Hour</th><th>Days To Recover</th><th>Income Lost<br/> During Recovery</th></tr><tr><td id='resPill'>0</td><td id='resEconLost'>0</td><td id='resDays'>0</td><td id='resIncLost'>0</td></tr></table></center>")
}

function brPillageInit() {
    document.writeln("<table class='pillageTable'><tr><th colspan='2'>Base Pillage</th></tr><tr><td>Base Econ</th><td>Base Income</th><tr><td><input type='text' id='brEcon' size='9' maxlength='9' value='0' onchange='brPillageCalc(this);' /></td><td><input type='text' id='brIncome' size='9' maxlength='9' value='0' onchange='brPillageCalc(this);' /></td></tr><tr><td align='right'>Min. Pillage:</td><td id='brResPill'>0</td></tr></table>")
}

function doPillageCalc(a) {
    var b = $("bEcon").value,
        c = $("bIncome").value;
    if (a.id == "bEcon") c = b;
    if (IsNumeric(b)) {
        b = parseInt(b, 10);
        a = Math.floor(b * 0.7);
        if (c == 0 || c > b || !IsNumeric(c)) c = b;
        else if (c < a) c = a;
        a = parseFloat($("attLevel").value);
        var d = parseFloat($("defLevel").value);
        if (!IsNumeric($("attLevel").value) || a <= 0) a = 1;
        if (!IsNumeric($("defLevel").value) || d <= 0) d = 1;
        $("attLevel").value = a;
        $("defLevel").value = d;
        $("bIncome").value = c;
        c = parseInt(c, 10);
        a = d / a;
        if (a >= 0.65) a = 1;
        b = calcPillage(b, c, a);
        $("resPill").innerHTML = b[0];
        $("resEconLost").innerHTML = b[1];
        $("resDays").innerHTML = b[2];
        $("resIncLost").innerHTML = b[3]
    } else {
        if (!IsNumeric(b)) $("bEcon").value = 0;
        if (!IsNumeric(c)) $("bIncome").value = 0;
        $("resPill").innerHTML = "0";
        $("resEconLost").innerHTML = "0";
        $("resDays").innerHTML = "0";
        $("resIncLost").innerHTML = "0"
    }
}

function brPillageCalc(a) {
    var b = $("brEcon").value,
        c = $("brIncome").value;
    if (a.id == "brEcon") c = b;
    if (IsNumeric(b)) {
        b = parseInt(b, 10);
        a = Math.floor(b * 0.7);
        if (c == 0 || c > b || !IsNumeric(c)) c = b;
        else if (c < a) c = a;
        $("brIncome").value = c;
        c = parseInt(c, 10);
        b = calcPillage(b, c, 1);
        $("brResPill").innerHTML = b[0]
    } else {
        if (!IsNumeric(b)) $("bEcon").value = 0;
        if (!IsNumeric(c)) $("bIncome").value = 0;
        $("brResPill").innerHTML = "0"
    }
    printBR()
}

function calcPillage(a, b, c) {
    var d = [];
    d[0] = commaFormat(Math.floor(6 * Math.pow(b - a * 0.7, 2) * c));
    d[1] = commaFormat(Math.round(a * 0.3 * c));
    d[2] = commaFormat(Math.round(d[1] / 2));
    a = 0;
    for (b = 1; b <= d[2]; b++) a += 24 * (d[1] - (b - 1) * 2);
    d[3] = commaFormat(a);
    return d
}

function commonPillages() {
    var a = "<table class='pillageTable' rules='rows'><tr><th>Base Economy</th><th>Min. Pillage</th><th>Eco Lost Per Hour</th><th>Days To Recover</th><th>Income Lost<br/> During Recovery</th></tr>",
        b = 5,
        c = calcPillage(b, b, 1);
    a += "<tr id='rowHover'><td>" + b + "</td><td>" + c[0] + "</td><td>" + c[1] + "</td><td>" + c[2] + "</td><td>" + c[3] + "</td></tr>";
    for (b = b = 10; b < 30; b += 2) {
        c = calcPillage(b, b, 1);
        a += "<tr id='rowHover'><td>" + b + "</td><td>" + c[0] + "</td><td>" + c[1] + "</td><td>" + c[2] + "</td><td>" + c[3] + "</td></tr>"
    }
    for (b = b = 30; b <= 250; b += 5) {
        c = calcPillage(b, b, 1);
        a += "<tr id='rowHover'><td>" + b + "</td><td>" + c[0] + "</td><td>" + c[1] + "</td><td>" + c[2] + "</td><td>" + c[3] + "</td></tr>"
    }
    a += "</table>";
    document.writeln(a)
}
window.calcInit = calcInit;
window.setTech = setTech;
window.resetTech = resetTech;
window.setUnits = setUnits;
window.resetUnits = resetUnits;
window.pillageInit = pillageInit;
window.brPillageInit = brPillageInit;
window.commonPillages = commonPillages;
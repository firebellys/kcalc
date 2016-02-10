function showHelp(a, b) {
    var c = document.getElementById(a);
    var d = pos(b);
    c.style.display = "block";
    c.style.left = (d[0] + b.offsetWidth + 5) + "px";
    c.style.top = d[1] + "px";
}

function hideHelp(a) {
    var c = document.getElementById(a);
    c.style.display = "none";
}

function pos(z) {
    var x = 0, y = 0;
    if (z.offsetParent) { do { x += z.offsetLeft; y += z.offsetTop; } while (z = z.offsetParent); }
    return [x, y];
}

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}  

//Shortcut for document.getElementById
function $(id) {
    return document.getElementById(id);
}

//---String Functions ---
String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};

function zeroPad(num, zeros) {

    if (!zeros)
        zeros = 1;
    var rerVal = num + "";
    var checkNum = "";
    for (var i = 0; i < zeros; i++) {
        checkNum = parseInt(checkNum + "9");
        if (num <= checkNum)
            rerVal = "0" + rerVal;
    }
    return rerVal;
}

//---Number Functions---
function IsNumeric(input) {
    if (!isNaN(input)) {
        return (input - 0) == input && input.length > 0;
    }
    return false
}
//rounds a number to the specified number of decimals
function roundNumber(num, dec) {
    var mult = Math.pow(10, dec);
    var result = Math.round(num * mult) / mult;
    return result;
}
//rounds a number up to the specified number of decimals
function roundUp(value, dec) {
    var mult = Math.pow(10, dec);
    var rounded = Math.ceil(value * mult) / mult;
    return rounded;
}

//format numbers with commas From http://www.web-source.net/web_development/currency_formatting.htm
function commaFormat(amount) {
    var delimiter = ",";
    amount = "" + amount;
    var a = amount.split('.', 2)
    var d = a[1];
    var i = parseInt(a[0]);
    if (isNaN(i)) { return ''; }
    var minus = '';
    if (i < 0) { minus = '-'; }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while (n.length > 3) {
        var nn = n.substr(n.length - 3);
        a.unshift(nn);
        n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) { a.unshift(n); }
    n = a.join(delimiter);
    if (d == undefined || d.length < 1) { amount = n; }
    else { amount = n + '.' + d; }
    amount = minus + amount;
    return amount;
}

/*
Attack Force
Unit	Start Quant.	End Quant.	Power	Armour	Shield
Scout Ship	1	?	2	4.2	0

Defensive Force
Unit	Start Quant.	End Quant.	Power	Armour	Shield
Scout Ship	1	?	1.9	4.4	0
*/

// Main Function for handling the paste.
function pullFromClipboard() {
    // Get data from the textarea
    var theData = document.getElementById('pastaArea').value;

    // Split the data into an array by new lines
    theData = theData.split("\n");

    // A or D for which force we are working with
    var isDefendingForce = 'a';
    
    // Parse the data
    for (var i = 0; i < theData.length; i++) {

        // First check for text headers.
        if ((theData[i].indexOf('Force') > -1) || (theData[i].indexOf('Unit') > -1)) {

            // Flag the force type, so we know later which column to add to.
            if (theData[i].indexOf('Defensive ') > -1) {
                isDefendingForce = 'd';
            }
            
            // TODO: remove later
            console.log('Found Force or unit');
        } else {
            
            // Storage for Ship Name
            var shipName = "";
            
            // Parse a single row
            var singleRow = theData[i].trim().split(/\s+/);
    
            // Ugly hard coded. Check for single or two string ship names.
            if (singleRow.lenght == 6) {
                
                // Grab the ship name/type
                shipName = singleRow[0];
                
                // Send it's value to the posting method.
                addShipValues(shipName, isDefendingForce, singleRow[1], singleRow[3], singleRow[4], singleRow[5])
            } else if (singleRow.length == 7) {
                
                // Grab the ship name/type
                shipName = singleRow[0] + " " + singleRow[1];
                
                // Send it's value to the posting method.
                addShipValues(shipName, isDefendingForce, singleRow[2], singleRow[4], singleRow[5], singleRow[6])
            }
            // This is where we add real code to split up the row 
        }
    }
}

function SwapDefAtt(text) {
    if (text == 'd') {
        return 'def'
    } else {
        return 'att'
    }
}

function addShipValues(shipType, isDefendingForce, start, power, armor, shield) {
    console.log('Adding Ship: ' + shipType + start + power + armor + shield)
    switch (shipType) {
        case 'Scout Ship':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'SS').value = start;
            document.getElementById(isDefendingForce + 'SSp').value = power;
            document.getElementById(isDefendingForce + 'SSa').value = armor;
            document.getElementById(isDefendingForce + 'SSs').value = shield;
            break;
        case 'Recycler':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'RC').value = start;
            document.getElementById(isDefendingForce + 'RCp').value = power;
            document.getElementById(isDefendingForce + 'RCa').value = armor;
            document.getElementById(isDefendingForce + 'RCs').value = shield;
            break;
        case 'Fighter':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'FT').value = start;
            document.getElementById(isDefendingForce + 'FTp').value = power;
            document.getElementById(isDefendingForce + 'FTa').value = armor;
            document.getElementById(isDefendingForce + 'FTs').value = shield;
            // Do Add logic
            break;
        case 'Bomber':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'BO').value = start;
            document.getElementById(isDefendingForce + 'BOp').value = power;
            document.getElementById(isDefendingForce + 'BOa').value = armor;
            document.getElementById(isDefendingForce + 'BOs').value = shield;
            // Do Add logic
            break;
        case 'Heavy Bomber':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'HB').value = start;
            document.getElementById(isDefendingForce + 'HBp').value = power;
            document.getElementById(isDefendingForce + 'HBa').value = armor;
            document.getElementById(isDefendingForce + 'HBs').value = shield;
            // Do Add logic
            break;
        case 'Ion Bomber':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'IB').value = start;
            document.getElementById(isDefendingForce + 'IBp').value = power;
            document.getElementById(isDefendingForce + 'IBa').value = armor;
            document.getElementById(isDefendingForce + 'IBs').value = shield;
            // Do Add logic
            break;
        case 'Corvette':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'CV').value = start;
            document.getElementById(isDefendingForce + 'CVp').value = power;
            document.getElementById(isDefendingForce + 'CVa').value = armor;
            document.getElementById(isDefendingForce + 'CVs').value = shield;
            // Do Add logic
            break;
        case 'Destroyer':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'DE').value = start;
            document.getElementById(isDefendingForce + 'DEp').value = power;
            document.getElementById(isDefendingForce + 'DEa').value = armor;
            document.getElementById(isDefendingForce + 'DEs').value = shield;
            // Do Add logic
            break;
        case 'Frigate':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'FR').value = start;
            document.getElementById(isDefendingForce + 'FRp').value = power;
            document.getElementById(isDefendingForce + 'FRa').value = armor;
            document.getElementById(isDefendingForce + 'FRs').value = shield;
            // Do Add logic
            break;
        case 'Ion Frigate':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'IF').value = start;
            document.getElementById(isDefendingForce + 'IFp').value = power;
            document.getElementById(isDefendingForce + 'IFa').value = armor;
            document.getElementById(isDefendingForce + 'IFs').value = shield;
            // Do Add logic
            break;
        case 'Outpost Ship':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'OS').value = start;
            document.getElementById(isDefendingForce + 'OSp').value = power;
            document.getElementById(isDefendingForce + 'OSa').value = armor;
            document.getElementById(isDefendingForce + 'OSs').value = shield;
            // Do Add logic
            break;
        case 'Cruiser':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'CR').value = start;
            document.getElementById(isDefendingForce + 'CRp').value = power;
            document.getElementById(isDefendingForce + 'CRa').value = armor;
            document.getElementById(isDefendingForce + 'CRs').value = shield;
            // Do Add logic
            break;
        case 'Carrier':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'CA').value = start;
            document.getElementById(isDefendingForce + 'CAp').value = power;
            document.getElementById(isDefendingForce + 'CAa').value = armor;
            document.getElementById(isDefendingForce + 'CAs').value = shield;
            // Do Add logic
            break;
        case 'Heavy Cruiser':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'HC').value = start;
            document.getElementById(isDefendingForce + 'HCp').value = power;
            document.getElementById(isDefendingForce + 'HCa').value = armor;
            document.getElementById(isDefendingForce + 'HCs').value = shield;
            // Do Add logic
            break;
        case 'Battleship':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'BS').value = start;
            document.getElementById(isDefendingForce + 'BSp').value = power;
            document.getElementById(isDefendingForce + 'BSa').value = armor;
            document.getElementById(isDefendingForce + 'BSs').value = shield;
            // Do Add logic
            break;
        case 'Fleet Carrier':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'FC').value = start;
            document.getElementById(isDefendingForce + 'FCp').value = power;
            document.getElementById(isDefendingForce + 'FCa').value = armor;
            document.getElementById(isDefendingForce + 'FCs').value = shield;
            // Do Add logic
            break;
        case 'Dreadnaught':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'DN').value = start;
            document.getElementById(isDefendingForce + 'DNp').value = power;
            document.getElementById(isDefendingForce + 'DNa').value = armor;
            document.getElementById(isDefendingForce + 'DNs').value = shield;
            // Do Add logic
            break;
        case 'Titan':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'TI').value = start;
            document.getElementById(isDefendingForce + 'TIp').value = power;
            document.getElementById(isDefendingForce + 'TIa').value = armor;
            document.getElementById(isDefendingForce + 'TIs').value = shield;
            // Do Add logic
            break;
        case 'Leviathan':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'LE').value = start;
            document.getElementById(isDefendingForce + 'LEp').value = power;
            document.getElementById(isDefendingForce + 'LEa').value = armor;
            document.getElementById(isDefendingForce + 'LEs').value = shield;
            // Do Add logic
            break;
        case 'Deathstar':
            document.getElementById(SwapDefAtt(isDefendingForce) + 'DS').value = start;
            document.getElementById(isDefendingForce + 'DSp').value = power;
            document.getElementById(isDefendingForce + 'DSa').value = armor;
            document.getElementById(isDefendingForce + 'DSs').value = shield;
            // Do Add logic
            break;

        default:
            break;
    }
    printBR();
}
/*

    'dArm'
    'defLas'
    'defMis'
    'defPla'
    'defSld'
    'defIon'
    'defPho'
    'defDis'
*/
function SetLevelsByFleet(type, power, armor, shield) {
    switch (type) {
        case 'Laser':
            var base = 2;
            document.getElementById('defLas').value = (((parseInt(power) - base / base) * 100) / 5).toString();
            document.getElementById('dArm').value = (((parseInt(armor) - base / base) * 100) / 5).toString();
            document.getElementById('defSld').value = (((parseInt(shield) - base / base) * 100) / 5).toString();
            break;
        case 'Missile':
            break;
        case 'Ion':
            break;
        case 'Photon':
            break;
        case 'Plasma':
            break;
        case 'Disruptor':
            break;
    }
}

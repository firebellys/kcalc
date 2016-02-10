function showHelp(a,b)
{
	var c= document.getElementById(a);
	var d = pos(b);
	c.style.display = "block";
	c.style.left = (d[0]+b.offsetWidth+5)+"px";
	c.style.top = d[1]+"px";
}

function hideHelp(a)
{
	var c= document.getElementById(a);
	c.style.display = "none";
}

function pos(z)
{
	var x = 0, y = 0;
	if(z.offsetParent){do{ x += z.offsetLeft; y += z.offsetTop;}while(z = z.offsetParent);}
	return [x,y];
}

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}  

//Shortcut for document.getElementById
function $(id)
{
	return document.getElementById(id);
}

//---String Functions ---
String.prototype.trim = function () {
  return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};

function zeroPad(num, zeros){
	
	if(!zeros)
		zeros = 1;
	var rerVal = num+"";
	var checkNum = "";
	for(var i =0; i < zeros; i++)
	{
		checkNum = parseInt(checkNum + "9");
		if(num <= checkNum)
			rerVal = "0" +  rerVal;
	}
	return rerVal;
}

//---Number Functions---
function IsNumeric(input)
{
	if(!isNaN(input))
	{
		return (input - 0) == input && input.length > 0;
   }
   return false
}
//rounds a number to the specified number of decimals
function roundNumber(num, dec) 
{
	var mult = Math.pow(10,dec);
	var result = Math.round(num*mult) / mult;
	return result;
}
//rounds a number up to the specified number of decimals
function roundUp(value, dec)
{
    var mult = Math.pow(10,dec);
    var rounded = Math.ceil(value*mult) / mult;
    return rounded;
}

//format numbers with commas From http://www.web-source.net/web_development/currency_formatting.htm
function commaFormat(amount){
	var delimiter = ",";
	amount = ""+amount;
	var a = amount.split('.',2)
	var d = a[1];
	var i = parseInt(a[0]);
	if(isNaN(i)) { return ''; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	var n = new String(i);
	var a = [];
	while(n.length > 3)
	{
		var nn = n.substr(n.length-3);
		a.unshift(nn);
		n = n.substr(0,n.length-3);
	}
	if(n.length > 0) { a.unshift(n); }
	n = a.join(delimiter);
	if(d==undefined || d.length < 1) { amount = n; }
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
                isDefendingForce = 'def';
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

function addShipValues(shipType, isDefendingForce, start, power, armor, shield) {

    switch (shipType) {
        case 'Scout Ship':
            // Do Add logic
            break;
        case 'Fighter':
            document.getElementById(isDefendingForce+'FT').innerHTML = power;
            document.getElementById(isDefendingForce+'FTp').innerHTML = power;
            document.getElementById(isDefendingForce+'FTa').innerHTML = armor;
            document.getElementById(isDefendingForce+'FTs').innerHTML = shield;
            // Do Add logic
            break;
        case 'Bomber':
            // Do Add logic
            break;
        case 'Heavy Bomber':
            // Do Add logic
            break;
        case 'Ion Bomber':
            // Do Add logic
            break;
        case 'Corvette':
            // Do Add logic
            break;
        case 'Destroyer':
            // Do Add logic
            break;
        case 'Frigate':
            // Do Add logic
            break;
        case 'Frigate':
            // Do Add logic
            break;
        case 'Ion Frigate':
            // Do Add logic
            break;
        case 'Outpost Ship':
            // Do Add logic
            break;
        case 'Cruiser':
            // Do Add logic
            break;
        case 'Carrier':
            // Do Add logic
            break;
        case 'Heavy Cruiser':
            // Do Add logic
            break;
        case 'Battleship':
            // Do Add logic
            break;
        case 'Fleet Carrier':
            // Do Add logic
            break;
        case 'Dreadnaught':
            // Do Add logic
            break;
        case 'Titan':
            // Do Add logic
            break;
        case 'Leviathan':
            // Do Add logic
            break;
        case 'Deathstar':
            // Do Add logic
            break;

        default:
            break;
    }
    console.log("In add ship method" + shipType);
}

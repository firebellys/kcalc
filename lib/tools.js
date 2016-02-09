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
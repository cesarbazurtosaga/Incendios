var AutoDisplayLeyend=function(c)
	{
	
	if(c!==undefined)
		{
		var leyend=document.getElementById('items');
		var labels=[];
		var val=c;
		labels.push('<b>NÚM. DE INCENDIOS</b>');
		labels.push('<i  style=" background:rgba(107,6,1,1);border-color:rgba(44,104,141,1);"></i> '+numeral((val[6])).format('0,0')+' - ');
		labels.push('<i  style=" background:rgba(158,68,16,1);	border-color:rgba(44,104,141,1);"></i> '+numeral((val[5])).format('0,0')+' - '+numeral(val[6]).format('0,0'));
		labels.push('<i  style=" background:rgba(214,133,34,1);border-color:rgba(44,104,141,1); "></i> '+numeral((val[4])).format('0,0')+' - '+numeral(val[5]).format('0,0'));
		labels.push('<i  style=" background:rgba(247,176,62,1);border-color:rgba(44,104,141,1);"></i> '+numeral((val[3])).format('0,0')+' - '+numeral(val[4]).format('0,0'));
		labels.push('<i  style=" background:rgba(252,221,53,0.9);border-color:rgba(44,104,141,1);"></i> '+numeral((val[2])).format('0,0')+' - '+numeral(val[3]).format('0,0'));
		labels.push('<i  style=" background:rgba(254,250,100,0.7);border-color:rgba(83,147,92,1);"></i> '+numeral(1).format('0,0')+' - '+numeral(val[2]).format('0,0'));
		leyend.style.display='block';
		leyend.innerHTML=labels.join('<br>')
	}
};
